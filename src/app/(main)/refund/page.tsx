import Link from "next/link";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-premium-bg pt-32 pb-24 px-6 text-premium-text">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-premium-border/40 pb-8">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Consumer Protection & Fair Trade
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-premium-text mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-premium-text/60 text-sm font-mono">
            Last Updated: October 2026 • Policy Version 2.4
          </p>
        </div>

        <div className="prose prose-lg text-premium-text/80 space-y-10 leading-relaxed font-light">
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              1. Nature of Digital Goods & General Cancellation Rule
            </h2>
            <p>
              MvjHub specializes exclusively in high-resolution, uncompressed master digital visual assets ("Digital Products"). Because all items sold through our platform are intangible and delivered instantaneously via secure cryptographic download links upon payment confirmation, <strong>all sales are generally final, non-refundable, and non-cancellable</strong> once the digital download link or encrypted asset key has been generated and dispatched.
            </p>
            <p className="mt-3">
              Unlike tangible physical merchandise, digital visual media cannot be returned or physically retrieved once transmitted to the customer's storage device.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              2. Eligible Scenarios for Full Refund or Replacement
            </h2>
            <p>
              We stand behind the uncompromising quality and craftsmanship of our creative assets. We gladly provide a <strong>100% full refund</strong> or an immediate replacement asset under the following circumstances:
            </p>
            <div className="space-y-4 mt-4">
              <div className="bg-premium-surface border border-premium-border/40 p-5 rounded-xl">
                <h3 className="font-serif text-lg text-premium-orange mb-1">A. Corrupted or Defective Files</h3>
                <p className="text-sm text-premium-text/70">
                  If the downloaded file is technically corrupted, missing pixels, or cannot be opened using industry-standard photo software (Photoshop, Lightroom, Preview, etc.), and our technical team cannot provide a clean replacement file within 24 hours.
                </p>
              </div>

              <div className="bg-premium-surface border border-premium-border/40 p-5 rounded-xl">
                <h3 className="font-serif text-lg text-premium-orange mb-1">B. Duplicate or Accidental Multiple Charges</h3>
                <p className="text-sm text-premium-text/70">
                  If your payment method was billed multiple times for the exact same order due to a network timeout, gateway re-attempt, or browser refresh. All duplicate excess transactions are identified and refunded in full immediately.
                </p>
              </div>

              <div className="bg-premium-surface border border-premium-border/40 p-5 rounded-xl">
                <h3 className="font-serif text-lg text-premium-orange mb-1">C. Permanent Delivery Failure</h3>
                <p className="text-sm text-premium-text/70">
                  If technical server failure prevents the generation of the download link and email receipt, and our support team cannot resolve access within 48 hours of notification.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              3. Refund Processing Timeline & Mode of Payment
            </h2>
            <p>
              Once a refund request is reviewed and approved by our support desk:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Processing Timeframe:</strong> The refund will be initiated by our team within <strong>24 to 48 hours</strong> of verification.
              </li>
              <li>
                <strong>Settlement into Customer Account:</strong> In accordance with Indian banking and payment gateway operating cycles, the refunded amount will be credited back to the customer's <strong>original payment method (Credit/Debit Card, UPI account, or Net Banking) within 5 to 7 business days</strong>.
              </li>
              <li>
                <strong>Confirmation Receipt:</strong> An electronic refund voucher with the gateway transaction reference ID (UTR / RRN) will be emailed directly to your registered address for tracking with your bank.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              4. Order Cancellation Policy (Pre-Delivery vs Post-Delivery)
            </h2>
            <p>
              Due to the automated real-time processing of digital orders:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Orders in "Pending" Gateway State:</strong> If an order is pending verification by the bank and the customer wishes to cancel before the payment is captured, the transaction will automatically expire or be voided without debit.
              </li>
              <li>
                <strong>Completed Orders:</strong> Once the transaction status registers as "Paid" and the download link has been served, cancellations cannot be processed unless one of the eligibility conditions under Section 2 applies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              5. How to Initiate a Refund Request
            </h2>
            <p>
              To file a dispute or request a refund for a defective asset or duplicate charge, please contact our support desk:
            </p>
            <div className="bg-premium-surface border border-premium-border/40 p-6 rounded-xl mt-4 space-y-2 text-sm">
              <p><strong>Step 1:</strong> Email us at <a href="mailto:support@mvjhub.in" className="text-premium-orange underline">support@mvjhub.in</a></p>
              <p><strong>Step 2:</strong> Include your <strong>Order ID</strong> (found in your email receipt or on the checkout success screen).</p>
              <p><strong>Step 3:</strong> State the reason for your refund request and attach a screenshot or description of the technical error encountered.</p>
              <p className="text-xs text-premium-text/50 pt-2 border-t border-premium-border/30">
                Our support team will review your ticket within 24 business hours and notify you of the outcome.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
