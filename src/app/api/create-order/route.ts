import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import { supabaseAdmin } from '../../../lib/supabase-admin';

const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === "PRODUCTION" 
    ? CFEnvironment.PRODUCTION 
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID || "",
  process.env.CASHFREE_SECRET_KEY || ""
);

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const { items, total_usd } = await req.json();

    const order_id = "MVJ_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const order_amount = Math.round((total_usd * 96.26) * 100) / 100;
    
    // Generate dummy customer details for contactless
    const customer_email = `guest_${Date.now()}@mvjhub.in`;
    const customer_phone = "9999999999";

    // 1. Save order to Supabase as pending
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        session_id: order_id, // We use session_id to store the Cashfree Order ID
        customer_email: customer_email,
        total_amount: total_usd,
        status: 'pending'
      })
      .select('id')
      .single();

    if (orderError) throw orderError;

    // 2. Save order items
    const orderItems = items.map((item: any) => ({
      order_id: orderData.id,
      image_id: item.id,
      price_at_purchase: item.price_usd
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // 3. Create Cashfree Order
    const request: any = {
      order_amount: order_amount,
      order_currency: "INR",
      order_id: order_id,
      customer_details: {
        customer_id: "CUST_" + Date.now(),
        customer_phone: customer_phone, 
        customer_email: customer_email, 
        customer_name: "MvjHub Guest"
      },
      order_meta: {
        return_url: `${origin}/checkout/success?order_id=${order_id}`
      },
      order_note: "MvjHub Premium Stock Purchase"
    };

    const response = await cashfree.PGCreateOrder(request);
    
    if (response.data && response.data.payment_session_id) {
      return NextResponse.json({
        payment_session_id: response.data.payment_session_id,
        order_id: order_id
      });
    } else {
      throw new Error("Invalid response from Cashfree");
    }
  } catch (error: any) {
    console.error("Cashfree Order Creation Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
