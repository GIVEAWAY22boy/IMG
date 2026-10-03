import Link from "next/link";
import Image from "next/image";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-premium-border/60 pb-6 flex justify-between items-end">
           <h1 className="font-serif text-5xl text-premium-text">Secure Checkout</h1>
           <Link href="/cart" className="text-premium-orange uppercase tracking-widest text-xs font-bold hover:text-premium-text transition-colors">Return to Cart</Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Checkout Form */}
          <div className="lg:w-7/12 flex flex-col gap-10">
            {/* Contact Info */}
            <section>
              <h2 className="font-serif text-3xl text-premium-text mb-6">Contact Information</h2>
              <div className="flex flex-col gap-4">
                <input type="email" placeholder="Email Address" className="w-full bg-premium-surface border border-premium-border/80 rounded-md py-4 px-6 text-premium-text focus:outline-none focus:border-premium-orange transition-colors shadow-sm" />
                <p className="text-xs text-premium-text/40 ml-2">We'll send your high-resolution download links here.</p>
              </div>
            </section>

            {/* Billing Details */}
            <section>
              <h2 className="font-serif text-3xl text-premium-text mb-6">Billing Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full bg-premium-surface border border-premium-border/80 rounded-md py-4 px-6 text-premium-text focus:outline-none focus:border-premium-orange transition-colors shadow-sm" />
                <input type="text" placeholder="Last Name" className="w-full bg-premium-surface border border-premium-border/80 rounded-md py-4 px-6 text-premium-text focus:outline-none focus:border-premium-orange transition-colors shadow-sm" />
                <input type="text" placeholder="Country / Region" className="col-span-2 w-full bg-premium-surface border border-premium-border/80 rounded-md py-4 px-6 text-premium-text focus:outline-none focus:border-premium-orange transition-colors shadow-sm" />
              </div>
            </section>

            {/* Payment (Mock Stripe) */}
            <section>
              <h2 className="font-serif text-3xl text-premium-text mb-6">Payment</h2>
              <div className="bg-premium-surface border border-premium-border/80 rounded-md p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-premium-border/40 pb-4 mb-4">
                  <span className="text-premium-text font-medium flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                     Credit Card
                  </span>
                  <div className="flex gap-2">
                     {/* Mock Card Icons */}
                     <div className="w-8 h-5 bg-gray-200 rounded"></div>
                     <div className="w-8 h-5 bg-gray-200 rounded"></div>
                     <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Card Number" className="w-full bg-transparent border border-premium-border/80 rounded-md py-3 px-4 text-premium-text focus:outline-none focus:border-premium-orange transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="w-full bg-transparent border border-premium-border/80 rounded-md py-3 px-4 text-premium-text focus:outline-none focus:border-premium-orange transition-colors" />
                    <input type="text" placeholder="CVC" className="w-full bg-transparent border border-premium-border/80 rounded-md py-3 px-4 text-premium-text focus:outline-none focus:border-premium-orange transition-colors" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-premium-text/40 mt-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Payments are securely processed by Stripe.
              </p>
            </section>
            
            <button className="w-full bg-premium-orange text-white py-5 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-lg mt-4">
              Pay $98.00 USD
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-5/12">
            <div className="bg-premium-surface rounded-xl shadow-sm border border-premium-border/40 p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-premium-text mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-6 border-b border-premium-border/40 pb-6 mb-6">
                {/* Item 1 */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded border border-premium-border/40 overflow-hidden shrink-0">
                    <Image src="/premium_4.jpg" alt="Moody Portrait" fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-serif text-premium-text">Moody Portrait</h4>
                  </div>
                  <div className="text-premium-text font-medium">$49.00</div>
                </div>
                {/* Item 2 */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded border border-premium-border/40 overflow-hidden shrink-0">
                    <Image src="/premium_1.jpg" alt="Exclusive Landscape" fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-serif text-premium-text">Exclusive Landscape</h4>
                  </div>
                  <div className="text-premium-text font-medium">$49.00</div>
                </div>
              </div>
              
              <div className="flex justify-between text-premium-text/70 mb-3 text-sm">
                <span>Subtotal</span>
                <span>$98.00</span>
              </div>
              <div className="flex justify-between text-premium-text/70 mb-6 text-sm">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              
              <div className="flex justify-between text-2xl text-premium-text font-serif mb-8 pt-4 border-t border-premium-border/40">
                <span>Total</span>
                <span>$98.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
