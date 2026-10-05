import Link from "next/link";
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
            <Link href="/">
              <h2 className="font-serif text-4xl text-[#c5a059] mb-4">MvjHub.</h2>
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
            <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-white/40 mb-2">Connect</h3>
            <a href="#" className="hover:text-[#c5a059] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">Pinterest</a>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-sm font-light text-white/40">
          <p>&copy; 2026 MvjHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
