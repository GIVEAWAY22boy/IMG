import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      
      <main className="flex-grow">{children}</main>

      <footer className="w-full bg-[#1a140f] text-[#fdfaf6] border-t border-[#c5a059]/20 pt-20 pb-10 px-10 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#c5a059]/20 via-transparent to-transparent opacity-50 z-0"></div>
        
        <div className="max-w-[1600px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <Image
                src="/logo_mvj.png"
                alt="MvjHub Logo"
                width={44}
                height={44}
                className="w-10 h-10 object-contain rounded-full shadow-md group-hover:scale-105 transition-transform"
              />
              <h2 className="font-serif text-3xl md:text-4xl text-[#c5a059] group-hover:text-white transition-colors">MvjHub.</h2>
            </Link>
            <p className="font-light text-white/60 max-w-sm">
              Curating the world's most exclusive, handmade, and breathtaking visual assets for creators who demand perfection.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-white/40 mb-2">Explore</h3>
            <Link href="/collection" className="hover:text-[#c5a059] transition-colors">The Collection</Link>
            <Link href="/about" className="hover:text-[#c5a059] transition-colors">Our Story</Link>
            <Link href="/cart" className="hover:text-[#c5a059] transition-colors">Cart</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-white/40 mb-2">Connect & Support</h3>
            <p className="text-sm text-white/70">
              Inquiries: <a href="mailto:support@mvjhub.in" className="text-[#c5a059] hover:underline">support@mvjhub.in</a>
            </p>
            <p className="text-xs text-white/60">
              Helpline: <a href="tel:+918726040058" className="text-[#c5a059] hover:underline">+91 87260 40058</a>
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              HQ: Lalitpur, Uttar Pradesh, India
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-white/50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              PCI-DSS & RBI Compliant Processing
            </div>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-sm font-light text-white/40">
          <p>&copy; 2026 MvjHub Visual Media. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            <Link href="/contact" className="hover:text-[#c5a059] transition-colors">Contact Us</Link>
            <Link href="/privacy" className="hover:text-[#c5a059] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#c5a059] transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-[#c5a059] transition-colors">Refund & Cancellation</Link>
            <Link href="/shipping" className="hover:text-[#c5a059] transition-colors">Shipping & Delivery</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
