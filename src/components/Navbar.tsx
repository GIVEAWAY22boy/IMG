"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Hydration-safe cart state
  const cart = useCartStore((state) => state.cart);
  const initCurrency = useCartStore((state) => state.initCurrency);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.length);
  }, [cart]);

  // Init currency detection exactly once on mount
  useEffect(() => {
    initCurrency();
  }, [initCurrency]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full py-8 px-10 flex justify-between items-center absolute top-0 z-50 mix-blend-difference text-white">
        <Link href="/" className="font-serif text-3xl tracking-widest font-medium z-[100]">
          MvjHub.
        </Link>

        <div className="flex items-center gap-8 z-[100]">
          {/* Minimalist Cart Icon */}
          <Link href="/cart" className="relative hover:opacity-70 transition-opacity flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {/* We use an inverted color here (#15223c) so that mix-blend-difference turns it into our cream color (#eaddc3) */}
            <span 
              className="absolute -top-2 -right-2 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#15223c' }}
            >
              {cartItemsCount}
            </span>
          </Link>

          {/* Hamburger by talhabangyal */}
          <label className="hamburger text-white">
            <input
              type="checkbox"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
            />
          <svg viewBox="0 0 32 32" style={{ stroke: 'white' }} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14">
            <path
              className="line line-top-bottom"
              style={{ stroke: 'white' }}
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" style={{ stroke: 'white' }} d="M7 16 27 16"></path>
          </svg>
        </label>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div
        className={
          "fixed inset-0 bg-premium-bg z-40 transition-all duration-700 ease-in-out flex flex-col items-center justify-center " +
          (isOpen ? 'opacity-100 visible' : 'opacity-0 invisible')
        }
      >
        <div className={
          "flex flex-col items-center gap-10 font-serif text-5xl md:text-7xl transition-transform duration-700 delay-100 " +
          (isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0')
        }>
          <Link href="/collection" className="text-premium-text hover:text-premium-orange hover:italic transition-all">Collection.</Link>
          <Link href="/about" className="text-premium-text hover:text-premium-orange hover:italic transition-all">Story.</Link>
          <Link href="/contact" className="text-premium-text hover:text-premium-orange hover:italic transition-all">Contact.</Link>
        </div>

        <div className={
          "absolute bottom-20 flex gap-12 text-sm uppercase tracking-widest text-premium-text/50 font-medium transition-all duration-700 delay-300 " +
          (isOpen ? 'opacity-100' : 'opacity-0')
        }>
          <a href="#" className="hover:text-premium-orange transition-colors">Instagram</a>
          <a href="#" className="hover:text-premium-orange transition-colors">Twitter</a>
        </div>
      </div>
    </>
  );
}
