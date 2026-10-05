"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore, formatPrice } from "@/store/cartStore";

export default function Checkout() {
  const [contact, setContact] = useState("");
  const cart = useCartStore((state) => state.cart);
  const currency = useCartStore((state) => state.currency);

  const subtotalUsd = cart.reduce((total, item) => total + item.price_usd, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "15551234567"; 
    const text = `Hi MvjHub! I'd like to submit a licensing request for the items in my cart.\n\nMy contact info: ${contact}\nSubtotal: ${formatPrice(subtotalUsd, currency)}\nItems: ${cart.length}\n\nPlease let me know the next steps for payment and high-res delivery.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-premium-border/60 pb-6 flex justify-between items-end">
           <h1 className="font-serif text-5xl text-premium-text">Secure Checkout</h1>
           <Link href="/cart" className="text-premium-orange uppercase tracking-widest text-xs font-bold hover:text-premium-text transition-colors">Return to Cart</Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:w-7/12 flex flex-col gap-10">
            {/* Contact Info */}
            <section>
              <h2 className="font-serif text-3xl text-premium-text mb-6">Contact Information</h2>
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email Address or Phone Number" 
                  className="w-full bg-premium-surface border border-premium-border/80 rounded-md py-4 px-6 text-premium-text focus:outline-none focus:border-premium-orange transition-colors shadow-sm" 
                  required
                />
                <p className="text-xs text-premium-text/40 ml-2">We will contact you here to finalize your licensing and deliver high-resolution assets.</p>
              </div>
            </section>
            
            <button className="w-full bg-premium-orange text-white py-5 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-lg mt-4">
              Submit Licensing Request
            </button>
            <p className="text-xs text-premium-text/40 text-center mt-2">
              No payment is required at this step. Our curation team will review your request.
            </p>
          </form>

          {/* Order Summary Sidebar */}
          <div className="lg:w-5/12">
            <div className="bg-premium-surface rounded-xl shadow-sm border border-premium-border/40 p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-premium-text mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-6 border-b border-premium-border/40 pb-6 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded border border-premium-border/40 overflow-hidden shrink-0 bg-premium-bg/50">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-premium-text">{item.title}</h4>
                    </div>
                    <div className="text-premium-text font-medium">{formatPrice(item.price_usd, currency)}</div>
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
