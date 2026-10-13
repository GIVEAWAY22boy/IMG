import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { supabaseAdmin } from '../../../lib/supabase-admin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to generate signed URLs and notify admin
async function fulfillOrder(orderData: any, order_id: string) {
  // 1. Fetch purchased items and their high-res paths
  const { data: itemsData, error: itemsError } = await supabaseAdmin
    .from('order_items')
    .select(`
      image_id,
      images ( title, highres_path )
    `)
    .eq('order_id', orderData.id);

  if (itemsError) throw itemsError;

  // 2. Generate signed URLs for downloads (valid for 7 days)
  const downloads = await Promise.all((itemsData || []).map(async (item: any) => {
    const path = item.images?.highres_path;
    const title = item.images?.title || "Asset";
    if (!path) return { title, url: "#" };

    const { data: signedData } = await supabaseAdmin
      .storage
      .from('secure-highres')
      .createSignedUrl(path, 60 * 60 * 24 * 7, { download: `${title}.png` });
      
    return {
      title,
      url: signedData?.signedUrl || "#"
    };
  }));

  // 3. Mark as paid in Supabase if not already marked
  if (orderData.status === 'pending') {
    await supabaseAdmin
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderData.id);

    // Send Admin Notification Email
    try {
      const totalInr = Math.round((orderData.total_amount * 96.26) * 100) / 100;
      const htmlContent = `
        <h1 style="font-family: sans-serif; color: #222;">🎉 New Razorpay Sale!</h1>
        <p>You just received a new order (<strong>${order_id}</strong>).</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Revenue:</strong> $${orderData.total_amount} USD (~₹${totalInr} INR)</p>
        </div>
        <h3>Items Sold:</h3>
        <ul>
          ${downloads.map(d => `<li>${d.title}</li>`).join('')}
        </ul>
        <p><em>The customer has been provided with their secure download links on the success page.</em></p>
      `;

      await resend.emails.send({
        from: 'MvjHub Sales <sales@mvjhub.in>', 
        to: 'kumarsenv2@gmail.com',
        subject: `💰 New Razorpay Sale: $${orderData.total_amount} USD (${downloads.length} items)`,
        html: htmlContent,
      });
    } catch (emailErr) {
      console.error("Failed to send admin notification email:", emailErr);
    }
  }

  return downloads;
}

// POST: Verify Razorpay Payment Signature
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      return NextResponse.json(
        { error: "Razorpay secret key not configured" },
        { status: 500 }
      );
    }

    const order_id = body.razorpay_order_id || body.order_id;
    const payment_id = body.razorpay_payment_id || body.payment_id;
    const signature = body.razorpay_signature || body.signature;

    // Validate required fields
    if (!order_id || !payment_id || !signature) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: order_id, payment_id, and signature are required." 
        },
        { status: 400 }
      );
    }

    // Generate HMAC-SHA256 signature
    const hmacData = `${order_id}|${payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(hmacData)
      .digest('hex');

    // Safe comparison of signatures
    const isMatch = 
      generated_signature.length === signature.length &&
      crypto.timingSafeEqual(Buffer.from(generated_signature), Buffer.from(signature));

    if (!isMatch) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Payment verification failed: Signature mismatch." 
        },
        { status: 400 }
      );
    }

    // Signature matches! Fulfill order in DB if present
    let downloads: any[] = [];
    try {
      const { data: orderData } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('session_id', order_id)
        .single();

      if (orderData) {
        downloads = await fulfillOrder(orderData, order_id);
      }
    } catch (dbErr) {
      console.error("Order fulfillment DB lookup error:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Payment signature verified successfully",
      order_id,
      payment_id,
      downloads
    });
  } catch (error: any) {
    console.error("Signature verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}

// GET: Query order status & downloads for checkout/success page
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const order_id = searchParams.get('order_id');

    if (!order_id) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('session_id', order_id)
      .single();

    if (orderError || !orderData) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // If order is already paid, return download links
    if (orderData.status === 'paid') {
      const downloads = await fulfillOrder(orderData, order_id);
      return NextResponse.json({ success: true, downloads });
    }

    // If pending, check with Razorpay API
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (key_id && key_secret) {
      const razorpay = new Razorpay({ key_id, key_secret });
      const payments = await razorpay.orders.fetchPayments(order_id);
      const isPaid = payments.items?.some((p: any) => p.status === 'captured');
      const isAuthorized = payments.items?.some((p: any) => p.status === 'authorized');

      if (isPaid || isAuthorized) {
        const downloads = await fulfillOrder(orderData, order_id);
        return NextResponse.json({ success: true, downloads });
      }
    }

    if (orderData.status === 'failed') {
      return NextResponse.json({ success: false, status: "FAILED", message: "Payment failed" });
    }

    return NextResponse.json({ success: false, status: "PENDING", message: "Payment is still processing." });
  } catch (error: any) {
    console.error("Order query error:", error);
    return NextResponse.json({ error: "Failed to query order" }, { status: 500 });
  }
}
