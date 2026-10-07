"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "./actions";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { 
      href: "/studio", 
      label: "Overview",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    { 
      href: "/studio/upload", 
      label: "Upload",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      )
    },
    { 
      href: "/studio/inventory", 
      label: "Inventory",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      )
    },
    { 
      href: "/studio/transactions", 
      label: "Sales",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-40 bg-premium-surface border-b border-premium-border/60 p-5 flex justify-between items-center shadow-sm">
        <Link href="/studio">
          <h1 className="font-serif text-2xl text-premium-orange tracking-widest">MvjHub.</h1>
        </Link>
        <form action={logoutAdmin}>
          <button className="text-[10px] uppercase tracking-widest text-red-500/80 hover:text-red-500 font-bold border border-red-500/30 px-3 py-1.5 rounded transition-colors">
            Logout
          </button>
        </form>
      </div>

      {/* Desktop Sidebar & Mobile Bottom Nav */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 md:static md:w-64 bg-premium-surface border-t md:border-t-0 md:border-r border-premium-border/60 flex md:flex-col justify-between shrink-0 md:h-screen md:sticky md:top-0 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)] md:shadow-none pb-safe">
        
        {/* Desktop Only Logo */}
        <div className="hidden md:block p-8 border-b border-premium-border/60">
          <Link href="/studio">
            <h1 className="font-serif text-3xl text-premium-orange tracking-widest hover:opacity-80 transition-opacity">MvjHub.</h1>
          </Link>
          <p className="text-premium-text/40 uppercase tracking-[0.2em] text-[10px] font-bold mt-1">Studio Dashboard</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-2 md:p-4 flex flex-row md:flex-col justify-around md:justify-start gap-1 md:gap-2 w-full">
          {links.map((link) => {
            const isActive = link.href === "/studio" 
              ? pathname === "/studio" 
              : pathname.startsWith(link.href);
              
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={
                  "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-3 rounded transition-colors text-[10px] md:text-sm uppercase tracking-widest font-medium w-full md:w-auto " +
                  (isActive 
                    ? "text-premium-orange md:bg-premium-orange/10" 
                    : "text-premium-text/50 hover:text-premium-orange md:hover:bg-premium-orange/5")
                }
              >
                <div className={isActive ? "text-premium-orange scale-110 md:scale-100 transition-transform" : "text-premium-text/50"}>
                  {link.icon}
                </div>
                <span className={isActive ? "font-bold" : "font-medium"}>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Desktop Only Logout */}
        <div className="hidden md:block p-8 border-t border-premium-border/60">
          <form action={logoutAdmin}>
            <button className="w-full text-left text-sm uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-colors font-medium">
              Secure Logout
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
