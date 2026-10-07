"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore, formatPrice } from "@/store/cartStore";
import { load } from '@cashfreepayments/cashfree-js';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const currency = useCartStore((state) => state.currency);

  const subtotalUsd = cart.reduce((total, item) => total + item.price_usd, 0);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);
    
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total_usd: subtotalUsd })
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} ${text}`);
      }
      
      const data = await response.json();
      
      if (data.payment_session_id) {
        const cashfree = await load({
          mode: "sandbox", 
        });
        
        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_self"
        });
      } else {
        alert("Failed to initialize payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-premium-border/60 pb-6 flex justify-between items-end">
           <h1 className="font-serif text-5xl text-premium-text">Secure Checkout</h1>
           <Link href="/cart" className="text-premium-orange uppercase tracking-widest text-xs font-bold hover:text-premium-text transition-colors">Return to Cart</Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Checkout Info */}
          <form onSubmit={handlePayment} className="lg:w-7/12 flex flex-col gap-10">
            <section>
              <h2 className="font-serif text-3xl text-premium-text mb-6">Payment Method</h2>
              <div className="bg-premium-surface border border-premium-border/80 rounded-md p-8">
                <p className="text-premium-text/70 mb-6">You will be securely redirected to our payment partner, Cashfree Payments, to complete your purchase. Cashfree supports all major Credit Cards, UPI, Netbanking, and Wallets. (100% Contactless)</p>
                
                <button 
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className="w-full bg-premium-orange text-white py-5 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Initializing Secure Gateway...
                    </>
                  ) : (
                    `Pay Now via Cashfree`
                  )}
                </button>
                <div className="flex items-center justify-center gap-4 mt-6 opacity-50">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                   <span className="text-xs tracking-widest uppercase font-bold">256-bit SSL Encrypted</span>
                </div>
              </div>
            </section>
          </form>

          {/* Order Summary Sidebar */}
          <div className="lg:w-5/12">
            <div className="bg-premium-surface rounded-xl shadow-sm border border-premium-border/40 p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-premium-text mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-6 border-b border-premium-border/40 pb-6 mb-6 max-h-[40vh] overflow-y-auto pr-4">
                {cart.length === 0 && <p className="text-premium-text/50 text-sm">Your cart is empty.</p>}
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded border border-premium-border/40 overflow-hidden shrink-0 bg-premium-bg/50">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-premium-text text-sm md:text-base line-clamp-1">{item.title}</h4>
                    </div>
                    <div className="text-premium-text font-medium text-sm md:text-base shrink-0">{formatPrice(item.price_usd, currency)}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-premium-text/70 mb-3 text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalUsd, currency)}</span>
              </div>
              <div className="flex justify-between text-premium-text/70 mb-6 text-sm">
                <span>Tax</span>
                <span>Included</span>
              </div>
              
              <div className="flex justify-between text-2xl text-premium-text font-serif mb-8 pt-4 border-t border-premium-border/40">
                <span>Total</span>
                <span>{formatPrice(subtotalUsd, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
