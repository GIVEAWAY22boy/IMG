export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl text-premium-text mb-4 border-b border-premium-border/60 pb-6">Shipping & Delivery Policy</h1>
        <p className="text-sm tracking-widest uppercase text-premium-orange mb-12">Last Updated: October 2026</p>
        
        <div className="space-y-8 text-premium-text/70 font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">1. Digital Goods Delivery</h2>
            <p>MvjHub is a digital-first platform. All of our exclusive stock photography assets are non-tangible, digital goods. We do not ship physical prints, hard drives, or any physical merchandise to a physical address.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">2. Instant Download</h2>
            <p>Upon successful payment processing and confirmation via our payment gateway, your purchased high-resolution files will be made available instantly. You will be automatically redirected to a secure download page where you can access your assets immediately.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">3. Email Confirmation & Backup Link</h2>
            <p>In addition to the instant on-site download, a confirmation email containing a backup download link will be dispatched to the email address provided during checkout. Please ensure your email address is entered correctly. If you do not see the email within 10 minutes, please check your spam or junk folder.</p>
          </section>
          
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">4. Delivery Issues</h2>
            <p>If you experience any technical difficulties with your download, or if the delivery email fails to arrive, please reach out to our support team immediately at <a href="mailto:support@mvjhub.com" className="text-premium-orange hover:underline">support@mvjhub.com</a>. We will manually verify your purchase and ensure you receive your files.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
