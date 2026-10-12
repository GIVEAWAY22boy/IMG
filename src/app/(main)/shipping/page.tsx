import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-premium-bg pt-32 pb-24 px-6 text-premium-text">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-premium-border/40 pb-8">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Fulfillment & Asset Dispatch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-premium-text mb-4">
            Shipping & Delivery Policy
          </h1>
          <p className="text-premium-text/60 text-sm font-mono">
            Digital Fulfillment Standards • Effective Date: October 2026
          </p>
        </div>

        <div className="prose prose-lg text-premium-text/80 space-y-10 leading-relaxed font-light">
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              1. 100% Digital Delivery Model
            </h2>
            <p>
              MvjHub operates exclusively as a digital visual curation studio. All items cataloged and offered for sale on this website are <strong>intangible digital assets</strong> (high-resolution photographs, master digital artwork, and raw editorial creative files).
            </p>
            <p className="mt-3">
              <strong>Notice on Physical Courier:</strong> No physical parcels, boxed packages, paper certificates, or tangible media (such as DVDs, memory cards, or framed prints) are dispatched via postal or courier logistics. Consequently, no courier tracking numbers or physical consignment air waybills (AWBs) are generated.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              2. Delivery Method & Delivery Cost
            </h2>
            <ul className="list-disc pl-6 space-y-3 mt-3">
              <li>
                <strong>Shipping & Transmission Charges:</strong> Exactly <strong>₹0.00 / $0.00 (Zero / Free Delivery)</strong> worldwide.
              </li>
              <li>
                <strong>Mode of Dispatch:</strong> Automated high-speed Content Delivery Network (CDN) electronic transmission directly through web browser and cryptographic download token.
              </li>
              <li>
                <strong>Secondary Email Backup:</strong> A mirrored copy of your commercial licensing voucher and permanent asset download link is concurrently dispatched via email to the email address entered during checkout.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              3. Delivery Timelines
            </h2>
            <div className="bg-premium-surface border border-premium-border/40 p-6 rounded-2xl space-y-4 mt-4">
              <div className="flex items-start gap-4">
                <span className="text-premium-orange font-bold text-xl">⚡</span>
                <div>
                  <h3 className="font-serif text-lg text-premium-text">Instant Browser Delivery</h3>
                  <p className="text-sm text-premium-text/70 mt-1">
                    Occurs immediately upon payment authorization (typically <strong>within 0 to 5 seconds</strong>). The customer is automatically presented with a direct "Download High-Res Master" button on screen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-premium-border/30">
                <span className="text-premium-orange font-bold text-xl">✉️</span>
                <div>
                  <h3 className="font-serif text-lg text-premium-text">Automated Email Dispatch</h3>
                  <p className="text-sm text-premium-text/70 mt-1">
                    Dispatched concurrently with transaction completion. Deliveries typically reach customer inboxes <strong>within 1 to 5 minutes</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-premium-border/30">
                <span className="text-premium-orange font-bold text-xl">⏳</span>
                <div>
                  <h3 className="font-serif text-lg text-premium-text">Pending Transactions & Banking Latency</h3>
                  <p className="text-sm text-premium-text/70 mt-1">
                    In rare cases where your banking institution holds a transaction in "Pending" status (common with inter-bank UPI or high-security card verification), our automated webhook system captures the payment upon bank clearance and delivers the asset immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              4. Troubleshooting Delivery Issues
            </h2>
            <p>
              If you have successfully completed a purchase but have not received your asset:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-3 text-sm">
              <li>
                <strong>Check Spam / Promotions Folder:</strong> Automated receipts with external file links can occasionally be filtered by aggressive corporate spam filters.
              </li>
              <li>
                <strong>Verify Email Accuracy:</strong> Ensure the email provided during checkout was spelled correctly without typographical errors.
              </li>
              <li>
                <strong>Immediate Support Desk:</strong> If you cannot access your file within 15 minutes of payment, email our 24/7 technical dispatch team at <a href="mailto:support@mvjhub.in" className="text-premium-orange underline">support@mvjhub.in</a> with your payment reference or Order ID. A direct alternate link will be issued manually within <strong>2 to 4 business hours</strong>.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
