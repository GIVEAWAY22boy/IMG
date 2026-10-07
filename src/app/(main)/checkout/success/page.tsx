"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutSuccess({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  const [status, setStatus] = useState<"loading" | "success" | "pending" | "failed">("loading");
  const [downloads, setDownloads] = useState<{title: string, url: string}[]>([]);
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Resolve searchParams promise
  const resolvedParams = use(searchParams);
  const orderId = resolvedParams.order_id;

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/verify-payment?order_id=${orderId}`);
        const data = await res.json();
        
        if (data.success) {
          setStatus("success");
          setDownloads(data.downloads || []);
          clearCart();
        } else if (data.status === "PENDING") {
          setStatus("pending");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [orderId, clearCart]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-premium-bg flex flex-col items-center justify-center gap-6">
        <div className="loader scale-150"></div>
        <p className="font-serif text-premium-text text-2xl animate-pulse mt-8">Verifying Payment & Generating Secure Links...</p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen bg-premium-bg flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full border-2 border-yellow-500 text-yellow-500 flex items-center justify-center mb-8 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h1 className="font-serif text-5xl text-premium-text mb-4 text-center">Payment Processing</h1>
        <p className="text-premium-text/70 mb-2 max-w-md text-center">Your order <span className="font-mono text-premium-text font-bold">{orderId}</span> is currently pending with the bank.</p>
        
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-md mb-10 max-w-lg mt-6">
          <p className="text-premium-text/90 text-sm text-center font-bold mb-2">🚨 IMPORTANT: Save this Order ID!</p>
          <p className="text-premium-text/70 text-xs text-center leading-relaxed">
            Because you checked out anonymously, this Order ID is your ONLY receipt. 
            Please refresh this page in a few minutes, or save the URL to check back later once your bank confirms the transaction.
          </p>
        </div>

        <button onClick={() => window.location.reload()} className="px-8 py-4 bg-premium-orange text-white rounded-full uppercase tracking-widest text-sm font-bold shadow-lg hover:bg-premium-text transition-colors">
          Refresh Status
        </button>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-premium-bg flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full border-2 border-red-500 text-red-500 flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <h1 className="font-serif text-5xl text-premium-text mb-4 text-center">Payment Failed</h1>
        <p className="text-premium-text/70 mb-10 max-w-md text-center">We couldn't verify your payment. Your card may have been declined or the transaction was cancelled.</p>
        <Link href="/checkout" className="px-8 py-4 bg-premium-orange text-white rounded-full uppercase tracking-widest text-sm font-bold shadow-lg hover:bg-premium-text transition-colors">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-bg flex flex-col items-center justify-center px-6 py-32">
      <div className="w-24 h-24 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center mb-8 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h1 className="font-serif text-5xl text-premium-text mb-4 text-center">Payment Successful</h1>
      <p className="text-premium-text/70 mb-2 max-w-md text-center">Your order <span className="font-mono text-premium-text font-bold">{orderId}</span> has been confirmed.</p>
      <p className="text-premium-text/70 mb-10 max-w-md text-center">Please save your order ID for your records. Your high-resolution files are generated and ready below.</p>
      
      {downloads.length > 0 && (
        <div className="w-full max-w-2xl bg-premium-surface border border-premium-border/60 rounded-xl p-8 mb-12 shadow-xl">
          <h2 className="font-serif text-2xl text-premium-text mb-6 border-b border-premium-border/40 pb-4">Your Secure Downloads</h2>
          <div className="flex flex-col gap-4">
            {downloads.map((d, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-premium-bg/50 rounded-lg border border-premium-border/20">
                <span className="font-serif text-lg text-premium-text">{d.title}</span>
                <a href={d.url} download className="px-6 py-2 bg-premium-orange text-white rounded-md uppercase tracking-widest text-xs font-bold hover:bg-premium-text transition-colors shadow-md">
                  Download
                </a>
              </div>
            ))}
          </div>
          <p className="text-xs text-premium-text/40 mt-6 text-center">These links will expire in 7 days. Please backup your files securely.</p>
        </div>
      )}

      <Link href="/collection" className="px-8 py-4 bg-transparent border border-premium-text text-premium-text rounded-full uppercase tracking-widest text-sm font-bold shadow-sm hover:bg-premium-text hover:text-white transition-colors">
        Continue Exploring
      </Link>
    </div>
  );
}
