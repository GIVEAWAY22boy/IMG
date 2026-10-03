"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "./actions";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/studio", label: "Overview" },
    { href: "/studio/upload", label: "Upload Image" },
    { href: "/studio/categories", label: "Categories" },
    { href: "/studio/pricing", label: "Global Pricing" },
  ];

  return (
    <aside className="w-full md:w-64 bg-premium-surface border-r border-premium-border/60 flex flex-col justify-between shrink-0 h-auto md:h-screen sticky top-0 shadow-sm">
      <div>
        <div className="p-8 border-b border-premium-border/60">
          <Link href="/">
            <h1 className="font-serif text-3xl text-premium-orange tracking-widest hover:opacity-80 transition-opacity">MvjHub.</h1>
          </Link>
          <p className="text-premium-text/40 uppercase tracking-[0.2em] text-[10px] font-bold mt-1">Studio Dashboard</p>
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
          {links.map((link) => {
            // Exact match for overview, startsWith for others
            const isActive = link.href === "/studio" 
              ? pathname === "/studio" 
              : pathname.startsWith(link.href);
              
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={
                  "px-4 py-3 rounded transition-colors text-sm uppercase tracking-widest font-medium " +
                  (isActive 
                    ? "bg-premium-orange/10 text-premium-orange" 
                    : "text-premium-text/70 hover:bg-premium-orange/5 hover:text-premium-orange")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-8 border-t border-premium-border/60">
        <form action={logoutAdmin}>
          <button className="w-full text-left text-sm uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-colors font-medium">
            Secure Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
