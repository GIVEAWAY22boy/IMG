export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-premium-bg py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl text-premium-text mb-4 border-b border-premium-border/60 pb-6">Privacy Policy</h1>
        <p className="text-sm tracking-widest uppercase text-premium-orange mb-12">Last Updated: October 2026</p>
        
        <div className="space-y-8 text-premium-text/70 font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">1. Information We Collect</h2>
            <p>At MvjHub, we respect your privacy. When you interact with our exclusive digital gallery, we only collect essential information required to process your license purchases and ensure a seamless experience. This includes your name, email address, payment details (processed securely via Stripe), and basic device identifiers for guest checkouts.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">2. How We Use Your Data</h2>
            <p>Your data is strictly used to deliver purchased digital assets, provide customer support, and, with your explicit consent, send updates regarding new premium collections. We do not sell, rent, or lease your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">3. Data Security</h2>
            <p>We employ enterprise-grade security protocols to protect your personal data. All transactions are encrypted using SSL technology. While no digital platform is 100% secure, we maintain rigorous standards to safeguard your information against unauthorized access.</p>
          </section>
          
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4">4. Your Rights</h2>
            <p>Under global data protection laws (including GDPR and CCPA), you have the right to access, modify, or permanently delete your personal data from our servers. Please contact our support team to exercise these rights.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
