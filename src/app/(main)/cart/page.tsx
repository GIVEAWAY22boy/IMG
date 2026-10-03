import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl text-premium-text mb-10 border-b border-premium-border/60 pb-6">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3 flex flex-col gap-8">
            {/* Item 1 */}
            <div className="flex gap-6 items-center p-4 bg-premium-surface rounded-xl shadow-sm border border-premium-border/40">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                <Image src="/premium_4.jpg" alt="Moody Portrait" fill className="object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-2xl text-premium-text">Moody Portrait</h3>
                <p className="text-premium-text/60 text-sm mt-1">High-Resolution Commercial License</p>
                <div className="mt-4 text-premium-orange font-medium">$49.00 USD</div>
              </div>
              <button className="p-2 text-premium-text/40 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>

            {/* Item 2 */}
            <div className="flex gap-6 items-center p-4 bg-premium-surface rounded-xl shadow-sm border border-premium-border/40">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                <Image src="/premium_1.jpg" alt="Exclusive Landscape" fill className="object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-2xl text-premium-text">Exclusive Landscape</h3>
                <p className="text-premium-text/60 text-sm mt-1">High-Resolution Commercial License</p>
                <div className="mt-4 text-premium-orange font-medium">$49.00 USD</div>
              </div>
              <button className="p-2 text-premium-text/40 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-premium-surface rounded-xl shadow-sm border border-premium-border/40 p-8 sticky top-32">
              <h2 className="font-serif text-3xl text-premium-text mb-6 border-b border-premium-border/40 pb-4">Order Summary</h2>
              
              <div className="flex justify-between text-premium-text/70 mb-4">
                <span>Subtotal (2 items)</span>
                <span>$98.00</span>
              </div>
              <div className="flex justify-between text-premium-text/70 mb-6">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between text-xl text-premium-text font-medium mb-8 pt-4 border-t border-premium-border/40">
                <span>Total</span>
                <span>$98.00 USD</span>
              </div>

              <Link href="/checkout" className="w-full block text-center bg-premium-orange text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-md">
                Proceed to Checkout
              </Link>
              
              <p className="text-center text-xs text-premium-text/40 mt-4">
                Instant digital download upon purchase. All sales are final.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
