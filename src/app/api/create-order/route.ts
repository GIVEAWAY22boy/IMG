import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: "Razorpay authentication credentials missing" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Calculate amount in paise
    let amountInPaise: number | undefined;

    if (typeof body.amount === 'number' || (typeof body.amount === 'string' && !isNaN(Number(body.amount)))) {
      amountInPaise = Math.round(Number(body.amount));
    } else if (body.total_usd !== undefined && !isNaN(Number(body.total_usd))) {
      // Exchange rate: 1 USD ≈ 96.26 INR -> paise = USD * 96.26 * 100
      amountInPaise = Math.round(Number(body.total_usd) * 96.26 * 100);
    } else if (Array.isArray(body.items) && body.items.length > 0) {
      const totalUsd = body.items.reduce((acc: number, it: any) => acc + (Number(it.price_usd) || 0), 0);
      amountInPaise = Math.round(totalUsd * 96.26 * 100);
    }

    // Minimum amount validation: at least 100 paise (₹1.00)
    if (!amountInPaise || isNaN(amountInPaise) || amountInPaise < 100) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum amount must be at least 100 paise (₹1.00)." },
        { status: 400 }
      );
    }

    const currency = (body.currency || 'INR').toUpperCase();
    const receipt = body.receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency,
        receipt,
        notes: {
          platform: "MvjHub",
          note: body.order_note || "MvjHub Premium Stock Purchase"
        }
      });
    } catch (rzpErr: any) {
      console.error("Razorpay API Order Creation Error:", rzpErr);
      if (rzpErr.statusCode === 401 || rzpErr.status === 401) {
        return NextResponse.json(
          { error: "Razorpay authentication failed" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: rzpErr.error?.description || rzpErr.message || "Failed to create Razorpay order" },
        { status: 500 }
      );
    }

    // Optionally save pending order in database if items are provided
    if (body.items && Array.isArray(body.items) && body.items.length > 0) {
      try {
        const customer_email = body.customer_email || `guest_${Date.now()}@mvjhub.in`;
        const total_usd = body.total_usd || Math.round((amountInPaise / 100 / 96.26) * 100) / 100;

        const { data: orderData, error: orderError } = await supabaseAdmin
          .from('orders')
          .insert({
            session_id: razorpayOrder.id, // Store Razorpay Order ID (e.g., order_xxxx)
            customer_email,
            total_amount: total_usd,
            status: 'pending'
          })
          .select('id')
          .single();

        if (!orderError && orderData) {
          const orderItems = body.items.map((item: any) => ({
            order_id: orderData.id,
            image_id: item.id,
            price_at_purchase: item.price_usd || 0
          }));

          await supabaseAdmin.from('order_items').insert(orderItems);
        }
      } catch (dbErr) {
        console.error("Supabase pending order creation error:", dbErr);
      }
    }

    return NextResponse.json({
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt
    });
  } catch (error: any) {
    console.error("General Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
