import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-premium-bg pt-32 pb-24 px-6 text-premium-text">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-premium-border/40 pb-8">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Data Privacy & Security
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-premium-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-premium-text/60 text-sm font-mono">
            Compliance: Information Technology Act, 2000 & DPDP Act • Updated: October 2026
          </p>
        </div>

        <div className="prose prose-lg text-premium-text/80 space-y-10 leading-relaxed font-light">
          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              1. Overview & Commitment
            </h2>
            <p>
              MvjHub Visual Media ("MvjHub", "we", "our") is dedicated to upholding the privacy, security, and integrity of the personal information of our clients, creators, and website visitors. This Privacy Policy details our practices regarding the collection, handling, storage, and protection of information obtained through <Link href="/" className="text-premium-orange underline">mvjhub.in</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              2. Information We Collect
            </h2>
            <p>
              To fulfill commercial orders and deliver digital licenses, we collect only the minimum required data:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Transactional Identity:</strong> Customer name and email address provided during checkout for delivery of digital download vouchers and receipts.
              </li>
              <li>
                <strong>Device & Regional Metadata:</strong> Anonymized time-zone data used strictly to display regional currency pricing (e.g. INR vs USD).
              </li>
              <li>
                <strong>Technical Logs:</strong> Server access timestamps, browser type, and anonymized IP addresses used for fraud prevention and system health monitoring.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              3. Payment Information & Financial Security
            </h2>
            <div className="bg-premium-surface border border-premium-border/40 p-6 rounded-2xl">
              <h3 className="font-serif text-lg text-premium-orange mb-2">Zero Sensitive Financial Storage</h3>
              <p className="text-sm text-premium-text/70 leading-relaxed">
                MvjHub operates a contactless, tokenized checkout architecture. <strong>We do not collect, store, log, or process credit card numbers, debit card PINs, CVVs, net-banking credentials, or UPI MPINs on our servers.</strong>
              </p>
              <p className="text-sm text-premium-text/70 leading-relaxed mt-2">
                All financial transactions are conducted directly inside secure, end-to-end 256-bit encrypted checkout sessions managed by RBI-authorized and PCI-DSS Level 1 certified payment aggregators (including Razorpay).
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              4. How We Use Collected Data
            </h2>
            <p>We use your information exclusively for legitimate business functions:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Instantaneous generation and transmission of your digital download keys.</li>
              <li>Automated dispatch of commercial tax invoices and purchase receipts.</li>
              <li>Fraud detection, dispute management, and anti-money laundering compliance.</li>
              <li>Providing responsive customer support and resolving technical download issues.</li>
            </ul>
            <p className="mt-3 font-medium text-premium-text">
              We never sell, rent, monetize, or trade your personal information to third-party advertisers or data brokers under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              5. Data Retention & User Rights
            </h2>
            <p>
              Order records and license grant logs are maintained securely to verify your ongoing commercial licensing rights in perpetuity. Under applicable law, you possess the right to inspect, correct, or request deletion of your personal account metadata upon written notice to our compliance desk, provided that basic transaction logs required for tax and statutory accounting may be retained as mandated by Indian law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-premium-text mb-4 font-normal">
              6. Grievance Officer & Data Inquiries
            </h2>
            <p>
              For questions regarding our privacy practices, data protection measures, or to exercise your rights, please contact our designated Grievance Officer:
            </p>
            <div className="bg-premium-surface border border-premium-border/40 p-6 rounded-xl mt-4 font-mono text-sm space-y-1">
              <p>Designation: Grievance & Data Protection Officer</p>
              <p>Entity: MvjHub Visual Media</p>
              <p>Email: privacy@mvjhub.in / support@mvjhub.in</p>
              <p>Location: 22, Kashiram Avas Colony, Near ITI, Lalitpur, Uttar Pradesh - 284403, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
