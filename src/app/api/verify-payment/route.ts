import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import { supabaseAdmin } from '../../../lib/supabase-admin';
import { Resend } from 'resend';

const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === "PRODUCTION" 
    ? CFEnvironment.PRODUCTION 
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID || "",
  process.env.CASHFREE_SECRET_KEY || ""
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const order_id = searchParams.get('order_id');

    if (!order_id) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    // 1. Verify the payment status with Cashfree
    const response = await cashfree.PGOrderFetchPayments(order_id as string);
    const payments = response.data || [];
    
    const isPaid = payments.some((payment: any) => payment.payment_status === "SUCCESS");
    const isPending = !isPaid && payments.some((payment: any) => payment.payment_status === "PENDING");

    // 2. Lookup the order in Supabase
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('session_id', order_id)
      .single();

    if (orderError || !orderData) {
      throw new Error("Order not found in database");
    }

    if (!isPaid) {
      if (isPending) {
        return NextResponse.json({ success: false, status: "PENDING", message: "Payment is still processing." });
      }
      
      // If it's explicitly failed or cancelled, update the DB so the dashboard shows "failed" instead of forever "pending"
      if (orderData.status === 'pending') {
        await supabaseAdmin
          .from('orders')
          .update({ status: 'failed' })
          .eq('id', orderData.id);
      }
      
      return NextResponse.json({ success: false, status: "FAILED", message: "Payment not successful" });
    }

    // 3. Fetch purchased items and their high-res paths
    const { data: itemsData, error: itemsError } = await supabaseAdmin
      .from('order_items')
      .select(`
        image_id,
        images ( title, highres_path )
      `)
      .eq('order_id', orderData.id);

    if (itemsError) throw itemsError;

    // 4. Generate signed URLs for downloads (valid for 7 days)
    const downloads = await Promise.all(itemsData.map(async (item: any) => {
      const path = item.images.highres_path;
      // Note: If you don't have signed URLs setup yet, we can use public URLs. 
      // Assuming 'secure-highres' is restricted, we use createSignedUrl
      const { data: signedData } = await supabaseAdmin
        .storage
        .from('secure-highres')
        .createSignedUrl(path, 60 * 60 * 24 * 7, { download: `${item.images.title}.png` });
        
      return {
        title: item.images.title,
        url: signedData?.signedUrl || "#"
      };
    }));

    // 5. Update Status and Notify Admin
    if (orderData.status === 'pending') {
      // Mark as paid
      await supabaseAdmin
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderData.id);

      // Send Admin Notification
      const totalInr = Math.round((orderData.total_amount * 96.26) * 100) / 100;
      const htmlContent = `
        <h1 style="font-family: sans-serif; color: #222;">🎉 New Sale!</h1>
        <p>You just received a new contactless order (<strong>${order_id}</strong>).</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Revenue:</strong> $${orderData.total_amount} USD (~₹${totalInr} INR)</p>
        </div>
        <h3>Items Sold:</h3>
        <ul>
          ${downloads.map(d => `<li>${d.title}</li>`).join('')}
        </ul>
        <p><em>The customer has been provided with their secure download links on the success page.</em></p>
      `;

      try {
        await resend.emails.send({
          from: 'MvjHub Sales <sales@mvjhub.in>', 
          to: 'kumarsenv2@gmail.com',
          subject: `💰 New Sale: $${orderData.total_amount} USD (${downloads.length} items)`,
          html: htmlContent,
        });
      } catch (emailErr) {
        console.error("Failed to send admin notification", emailErr);
        // Don't fail the verification if the email fails
      }
    }

    return NextResponse.json({ 
      success: true,
      downloads
    });
    
  } catch (error: any) {
    console.error("Cashfree Verification / Delivery Error:", error);
    return NextResponse.json({ error: "Failed to verify or deliver" }, { status: 500 });
  }
}
