"use client";

import Link from "next/link";
import Image from "next/image";
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
      <nav className="w-full py-7 px-8 md:px-12 flex justify-between items-center absolute top-0 z-50">
        <Link href="/" className="flex items-center gap-3.5 z-[100] group">
          <Image
            src="/logo_mvj.png"
            alt="MvjHub Logo"
            width={44}
            height={44}
            className="w-9 h-9 md:w-11 md:h-11 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform"
            priority
          />
          <span className="font-serif text-2xl md:text-3xl tracking-widest font-bold text-premium-text group-hover:text-premium-orange transition-colors">
            MvjHub.
          </span>
        </Link>

        <div className="flex items-center gap-7 md:gap-8 z-[100]">
          {/* Minimalist Cart Icon */}
          <Link href="/cart" className="relative text-premium-text hover:text-premium-orange transition-colors flex items-center p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span 
              className="absolute -top-1.5 -right-1.5 bg-premium-orange text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-premium-bg"
            >
              {cartItemsCount}
            </span>
          </Link>

          {/* Hamburger Menu */}
          <label className="hamburger text-premium-text hover:text-premium-orange transition-colors p-1">
            <input
              type="checkbox"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
            />
            <svg viewBox="0 0 32 32" className="w-9 h-9 md:w-11 md:h-11 cursor-pointer">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
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
          "flex flex-col items-center gap-8 font-serif text-5xl md:text-7xl transition-transform duration-700 delay-100 " +
          (isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0')
        }>
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/logo_mvj.png"
              alt="MvjHub Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain rounded-full shadow-md"
            />
          </div>
          <Link href="/collection" className="text-premium-text hover:text-premium-orange hover:italic transition-all">Collection.</Link>
          <Link href="/about" className="text-premium-text hover:text-premium-orange hover:italic transition-all">Story.</Link>
          <Link href="/contact" className="text-premium-text hover:text-premium-orange hover:italic transition-all">Contact.</Link>
        </div>

        <div className={
          "absolute bottom-20 flex flex-wrap justify-center gap-8 md:gap-12 text-sm uppercase tracking-widest text-premium-text/50 font-medium transition-all duration-700 delay-300 " +
          (isOpen ? 'opacity-100' : 'opacity-0')
        }>
          <a href="https://youtu.be/6ooK-zRY-f0?si=jYLn-zl8wbvNzDme" target="_blank" rel="noopener noreferrer" className="hover:text-premium-orange transition-colors">YouTube</a>
          <a href="#" className="hover:text-premium-orange transition-colors">Instagram</a>
          <a href="#" className="hover:text-premium-orange transition-colors">Twitter</a>
        </div>
      </div>
    </>
  );
}
