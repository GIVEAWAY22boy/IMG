export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl text-premium-text mb-4 border-b border-premium-border/60 pb-6">Refund Policy</h1>
        <p className="text-sm tracking-widest uppercase text-premium-orange mb-12">Last Updated: October 2026</p>
        
        <div className="space-y-8 text-premium-text/70 font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">1. Digital Goods Paradigm</h2>
            <p>Because MvjHub offers irrevocable, non-tangible digital goods (high-resolution stock photography), we generally do not issue refunds once the order is completed and the digital file has been downloaded. We strongly encourage all users to carefully review the watermarked previews before completing a purchase.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">2. Exceptional Circumstances</h2>
            <p>We stand behind the quality of our assets. Refunds may be granted in the following exceptional circumstances:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>Non-delivery of the file:</strong> Due to a technical issue on our end, the high-resolution file was never delivered or accessible to you.</li>
              <li><strong>File corruption:</strong> The downloaded file is demonstrably corrupt, damaged, or does not match the dimensions and quality described on the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">3. Requesting a Refund</h2>
            <p>If you believe your purchase meets the criteria for a refund under our exceptional circumstances, you must contact our support team within 14 days of the original purchase date. Please include your order number and a detailed explanation of the issue.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
