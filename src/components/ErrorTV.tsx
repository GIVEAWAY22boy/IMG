"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ErrorTV({ 
  bgText = "404", 
  screenText = "NOT FOUND" 
}: { 
  bgText?: string;
  screenText?: string;
}) {
  const router = useRouter();
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="main_wrapper">
        <div className="main_tv">
          <div className="antenna">
            <div className="antenna_shadow"></div>
            <div className="a1"></div>
            <div className="a1d"></div>
            <div className="a2"></div>
            <div className="a2d"></div>
            <div className="a_base"></div>
          </div>
          <div className="tv">
            <div className="cruve">
              <svg
                className="curve_svg"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 189.929 189.929"
                xmlSpace="preserve"
              >
                <path
                  d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
              C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                ></path>
              </svg>
            </div>
            <div className="display_div">
              <div className="screen_out">
                <div className="screen_out1">
                  <div className="screen">
                    <span className="notfound_text whitespace-pre"> {screenText} </span>
                  </div>
                  <div className="screenM">
                    <span className="notfound_text whitespace-pre"> {screenText} </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lines">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className="buttons_div">
              <div className="b1"><div></div></div>
              <div className="b2"></div>
              <div className="speakers">
                <div className="g1">
                  <div className="g11"></div>
                  <div className="g12"></div>
                  <div className="g13"></div>
                </div>
                <div className="g"></div>
                <div className="g"></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="base1"></div>
            <div className="base2"></div>
            <div className="base3"></div>
          </div>
        </div>
        <div className="text_404 flex justify-center w-full">
          {bgText.split('').map((char, i) => (
            <div key={i} className={`text_404${(i % 3) + 1}`}>{char}</div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 flex gap-6 z-50">
        <button 
          onClick={() => router.back()}
          className="px-8 py-3 rounded-full border border-premium-border/80 text-premium-text uppercase tracking-widest text-sm font-bold hover:border-premium-orange transition-colors"
        >
          Go Back
        </button>
        <Link 
          href="/collection"
          className="px-8 py-3 rounded-full bg-premium-orange text-white uppercase tracking-widest text-sm font-bold hover:bg-premium-text transition-colors shadow-lg"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
