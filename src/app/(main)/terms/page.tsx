import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-premium-bg pt-32 pb-24 px-6 text-premium-text">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-premium-border/40 pb-8">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Legal & Regulatory Framework
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-premium-text mb-4">
            Terms of Service
          </h1>
          <p className="text-premium-text/60 text-sm font-mono">
            Effective Date: October 1, 2026 • Last Reviewed: October 2026
          </p>
        </div>

        <div className="prose prose-lg text-premium-text/80 space-y-10 leading-relaxed font-light">
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("Licensee," "User," or "Customer") and <strong>MvjHub Visual Media</strong> ("MvjHub," "we," "us," or "our") governing your access to and use of our digital platform located at <Link href="/" className="text-premium-orange underline">mvjhub.in</Link> and all associated digital products and licensing services.
            </p>
            <p>
              By accessing our website, creating an order, or completing a digital transaction, you signify your full agreement to be bound by these Terms, our <Link href="/privacy" className="text-premium-orange underline">Privacy Policy</Link>, and our <Link href="/refund" className="text-premium-orange underline">Refund & Cancellation Policy</Link>. If you do not agree, you must immediately refrain from acquiring any assets.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">2. Nature of Digital Services & Products</h2>
            <p>
              MvjHub is a curated creative visual repository offering high-resolution digital photography, handcrafted editorial imagery, and digital art ("Digital Assets"). 
            </p>
            <p>
              All products sold on MvjHub are <strong>intangible digital goods</strong> delivered exclusively via electronic transmission (direct browser download and encrypted email link). No physical tangible items (such as photographic prints, CDs, or merchandise) are shipped or delivered.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">3. Grant of Commercial License & Intellectual Property</h2>
            <p>
              Upon successful payment verification, MvjHub grants you a <strong>perpetual, worldwide, non-exclusive, non-transferable commercial license</strong> to use, reproduce, modify, and display the purchased Digital Asset across:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Digital and web media (websites, mobile apps, social media campaigns, software interfaces).</li>
              <li>Commercial marketing materials, advertisements, digital billboards, and editorial publications.</li>
              <li>Print collateral and packaging up to 500,000 physical impressions.</li>
            </ul>
            <p className="mt-4">
              <strong>Ownership Retention:</strong> MvjHub and its contributing artists retain all original copyrights, intellectual property titles, and moral rights in the raw master files. This license does not constitute a transfer of title or intellectual property ownership.
            </p>
            <p className="mt-2 font-medium text-premium-text">
              <strong>Strict Restrictions:</strong> You shall NOT sub-license, resell, distribute, share via open torrent/P2P networks, or include the Digital Asset in any rival stock library or digital asset marketplace.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">4. Pricing, Currency & Payment Processing</h2>
            <p>
              Prices for all visual assets are listed transparently on individual catalog pages. Prices are displayed in <strong>United States Dollars (USD)</strong> for international visitors and converted transparently to <strong>Indian Rupees (INR)</strong> for transactions originated within India based on prevailing exchange rates.
            </p>
            <p>
              All payments are processed securely through certified, PCI-DSS Level 1 compliant payment gateways (including Razorpay, Cashfree, and international card networks). MvjHub does not capture, store, or process full credit card numbers or banking credentials on its local servers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">5. Electronic Delivery & Access</h2>
            <p>
              Delivery of your purchased Digital Asset occurs instantaneously upon successful authorization of payment by the respective banking gateway. The Licensee is redirected to an authenticated retrieval screen and receives an automated confirmation email containing cryptographic download verification links. Please refer to our <Link href="/shipping" className="text-premium-orange underline">Shipping & Delivery Policy</Link> for detailed timelines.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">6. Cancellation & Refunds</h2>
            <p>
              Because digital assets are delivered instantly and are irrevocable once downloaded, purchases are generally final and non-cancellable once the download key has been delivered. However, in the event of technical file corruption or dual billing, full refunds are processed within 5 to 7 business days in accordance with our <Link href="/refund" className="text-premium-orange underline">Refund & Cancellation Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">7. Warranty Disclaimer & Limitation of Liability</h2>
            <p>
              All visual assets are provided on an "as-is" and "as-available" basis without warranties of any kind, either express or implied, including fitness for a particular purpose or non-infringement. In no event shall MvjHub's total aggregate liability exceed the total purchase price actually paid by you for the specific asset giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">8. Governing Law & Jurisdiction</h2>
            <p>
              These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the Republic of India. The competent courts situated in <strong>Lalitpur, Uttar Pradesh, India</strong> shall have exclusive jurisdiction over any legal dispute arising hereunder.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">9. Contact & Notices</h2>
            <p>
              Formal legal notices or inquiries regarding these Terms of Service should be directed to:
            </p>
            <div className="bg-premium-surface border border-premium-border/40 p-6 rounded-xl mt-4 font-mono text-sm space-y-1">
              <p>Legal & Compliance Desk, MvjHub</p>
              <p>Email: legal@mvjhub.in / support@mvjhub.in</p>
              <p>Address: 22, Kashiram Avas Colony, Near ITI, Lalitpur, Uttar Pradesh - 284403, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
