"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore, formatPrice } from "@/store/cartStore";

export default function Home() {
  const [dbImages, setDbImages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const addToCart = useCartStore((state) => state.addToCart);
  const currency = useCartStore((state) => state.currency);

  const fallbackImages = [
    { src: "/premium_1.jpg", alt: "Exclusive Landscape", height: 600 },
    { src: "/premium_2.jpg", alt: "Minimalist Architecture", height: 400 },
    { src: "/premium_3.jpg", alt: "Handmade Texture", height: 500 },
    { src: "/premium_4.jpg", alt: "Moody Portrait", height: 700 },
    { src: "/premium_5.jpg", alt: "Abstract Art", height: 450 },
    { src: "/premium_2.jpg", alt: "Minimalist Details", height: 600 },
    { src: "/premium_1.jpg", alt: "Misty Valleys", height: 550 },
    { src: "/premium_3.jpg", alt: "Artisan Clay", height: 400 },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase
          .from("images")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(12);
        
        if (data) {
          setDbImages(data);
        }
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };
    fetchImages();
  }, []);

  const filteredImages = dbImages.filter((img) => 
    img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (img.tags && img.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-premium-bg overflow-x-hidden">
      
      {/* SECTION 1: The Cascading Floating Gallery Hero */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-premium-bg flex items-center">
        
        {/* Floating Background Grid */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 md:gap-10 opacity-70 scale-[1.15] -rotate-6 origin-center">
          {/* Row 1 - Right to Left */}
          <div className="flex gap-6 animate-[marquee_40s_linear_infinite] w-[200%]">
             {[...fallbackImages, ...fallbackImages, ...fallbackImages].map((img, idx) => (
               <div key={`r1-${idx}`} className="relative w-48 h-32 md:w-72 md:h-48 rounded-xl overflow-hidden shrink-0 shadow-lg opacity-80 hover:opacity-100 transition-opacity">
                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
          {/* Row 2 - Left to Right */}
          <div className="flex gap-6 animate-[marquee_50s_linear_infinite_reverse] w-[200%] ml-[-50%]">
             {[...fallbackImages, ...fallbackImages, ...fallbackImages].map((img, idx) => (
               <div key={`r2-${idx}`} className="relative w-56 h-36 md:w-80 md:h-52 rounded-xl overflow-hidden shrink-0 shadow-lg opacity-90 hover:opacity-100 transition-opacity">
                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
          {/* Row 3 - Right to Left */}
          <div className="flex gap-6 animate-[marquee_35s_linear_infinite] w-[200%] ml-[-20%]">
             {[...fallbackImages, ...fallbackImages, ...fallbackImages].map((img, idx) => (
               <div key={`r3-${idx}`} className="relative w-40 h-28 md:w-64 md:h-40 rounded-xl overflow-hidden shrink-0 shadow-lg opacity-70 hover:opacity-100 transition-opacity">
                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
          {/* Row 4 - Left to Right */}
          <div className="flex gap-6 animate-[marquee_45s_linear_infinite_reverse] w-[200%] ml-[-30%]">
             {[...fallbackImages, ...fallbackImages, ...fallbackImages].map((img, idx) => (
               <div key={`r4-${idx}`} className="relative w-64 h-40 md:w-96 md:h-64 rounded-xl overflow-hidden shrink-0 shadow-lg opacity-60 hover:opacity-100 transition-opacity">
                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Gradient Fade to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-premium-bg via-premium-bg/90 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-premium-bg/40 via-transparent to-premium-bg z-10"></div>

        {/* Text Content */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-6xl md:text-[5.5rem] text-premium-text leading-[1.05] tracking-tight mb-8">
              See the exclusive. <br />
              <span className="italic text-premium-orange">Know the extraordinary.</span>
            </h1>
            <p className="text-xl text-premium-text/70 font-light leading-relaxed mb-10 max-w-xl">
              Your brand deserves more than generic placeholders. Extract maximum value from a deeply curated vault of breathtaking, high-end editorial stock photography.
            </p>
            
            <div className="flex items-center gap-4">
              <Link href="/collection" className="bg-premium-orange text-white px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-premium-text transition-colors shadow-xl">
                Explore the Vault
              </Link>
              <Link href="/about" className="border border-premium-border/80 text-premium-text bg-premium-bg/50 backdrop-blur-sm px-8 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:border-premium-orange hover:text-premium-orange transition-colors shadow-sm">
                Talk to Curators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Manifesto Marquee */}
      <section className="py-12 bg-premium-text text-premium-bg overflow-hidden whitespace-nowrap flex items-center border-y border-premium-orange/30">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-12 font-serif text-4xl italic font-light tracking-wide">
          <span>No Generic Assets.</span>
          <span className="text-premium-orange text-sm uppercase not-italic tracking-widest font-bold">✦</span>
          <span>100% Curated.</span>
          <span className="text-premium-orange text-sm uppercase not-italic tracking-widest font-bold">✦</span>
          <span>Instant High-Res Delivery.</span>
          <span className="text-premium-orange text-sm uppercase not-italic tracking-widest font-bold">✦</span>
          <span>Handmade Exclusivity.</span>
          <span className="text-premium-orange text-sm uppercase not-italic tracking-widest font-bold">✦</span>
          <span>No Generic Assets.</span>
          <span className="text-premium-orange text-sm uppercase not-italic tracking-widest font-bold">✦</span>
          <span>100% Curated.</span>
        </div>
      </section>

      {/* SECTION 3: The Philosophy (Value Prop) */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-premium-orange/5 via-transparent to-transparent opacity-100 -z-10"></div>
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-6">
            <span className="text-5xl font-serif text-premium-orange/30 font-light">01</span>
            <h3 className="text-2xl font-serif text-premium-text">Immaculate Detail</h3>
            <p className="text-premium-text/70 font-light leading-relaxed">Every image is meticulously inspected for color science, grain structure, and emotional resonance. We don't just host photos; we host art.</p>
          </div>
          <div className="flex flex-col gap-6 pt-12 md:pt-24">
            <span className="text-5xl font-serif text-premium-orange/30 font-light">02</span>
            <h3 className="text-2xl font-serif text-premium-text">Seamless Licensing</h3>
            <p className="text-premium-text/70 font-light leading-relaxed">Buy once, use forever. Our licensing is crystal clear, designed for agencies and freelancers who need zero friction and absolute security.</p>
          </div>
          <div className="flex flex-col gap-6 pt-24 md:pt-48">
            <span className="text-5xl font-serif text-premium-orange/30 font-light">03</span>
            <h3 className="text-2xl font-serif text-premium-text">Zero Clutter</h3>
            <p className="text-premium-text/70 font-light leading-relaxed">We reject 99% of submissions. You save hours of scrolling because everything you see here is already a masterpiece ready for your canvas.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Featured Pairings (Creative Layout) */}
      <section className="py-32 px-6 bg-premium-surface border-y border-premium-border/40">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/3">
            <h2 className="font-serif text-5xl lg:text-7xl text-premium-text mb-8">Curated <br/><span className="italic text-premium-orange font-light">Pairings.</span></h2>
            <p className="text-premium-text/70 font-light text-lg mb-10">We construct visual narratives. Our editors hand-pair imagery that belongs together, making it effortless to build a cohesive brand identity.</p>
            <Link href="/collection" className="text-xs uppercase tracking-widest text-premium-orange font-bold border-b border-premium-orange pb-1 hover:text-premium-text hover:border-premium-text transition-colors">
              View All Collections
            </Link>
          </div>
          
          <div className="lg:w-2/3 relative h-[600px] w-full">
            {/* Offset Image 1 */}
            <div className="absolute top-0 right-0 w-[60%] h-[400px] shadow-2xl rounded-xl overflow-hidden z-20 transition-transform duration-700 hover:-translate-y-4">
              <img src="/premium_1.jpg" alt="Featured 1" className="w-full h-full object-cover" />
            </div>
            {/* Offset Image 2 */}
            <div className="absolute bottom-0 left-10 w-[50%] h-[450px] shadow-xl rounded-xl overflow-hidden z-10 transition-transform duration-700 hover:translate-y-4">
              <img src="/premium_3.jpg" alt="Featured 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: The Archive Grid */}
      <section className="py-32 px-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-premium-orange uppercase tracking-[0.3em] text-sm font-bold mb-4 block">
              Latest Additions
            </span>
            <h2 className="font-serif text-5xl text-premium-text">The Archive</h2>
          </div>
          
          {/* Aesthetic minimalist search */}
          <div className="w-full max-w-md relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search aesthetics..." 
              className="w-full bg-transparent border-b border-premium-text/20 py-3 text-premium-text placeholder-premium-text/40 focus:outline-none focus:border-premium-orange transition-colors duration-500 font-serif text-xl italic"
            />
          </div>
        </div>

        {/* Masonry Grid with Real DB Images */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {filteredImages.length > 0 ? (
            filteredImages.map((img) => (
              <div key={img.id} className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-700">
                <div className="absolute inset-0 bg-premium-text/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                <Link href={`/collection/${img.id}`} className="relative w-full block">
                  <img 
                    src={img.watermarked_url} 
                    alt={img.title}
                    className="w-full h-auto object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    loading="lazy"
                  />
                </Link>
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 flex flex-col justify-end h-[60%] pointer-events-none">
                  <h3 className="text-white font-serif text-2xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
                  <div className="flex justify-between items-center mt-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 pointer-events-auto">
                    <p className="text-white/80 text-sm font-light uppercase tracking-widest">{formatPrice(img.price_usd, currency)}</p>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: img.id,
                          title: img.title,
                          price_usd: img.price_usd,
                          image_url: img.watermarked_url
                        });
                      }}
                      className="w-10 h-10 rounded-full bg-premium-orange text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
               <p className="text-premium-text/50 font-serif italic text-2xl mb-4">No exclusive assets found.</p>
               <button onClick={() => setSearchQuery("")} className="text-premium-orange text-sm uppercase tracking-widest border-b border-premium-orange pb-1 hover:text-premium-text hover:border-premium-text transition-colors">Clear Search</button>
            </div>
          )}
        </div>
        
        <div className="mt-20 text-center">
           <Link href="/collection" className="inline-block border border-premium-border/80 text-premium-text px-12 py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:border-premium-orange hover:text-premium-orange transition-colors">
              Enter the Full Archive
           </Link>
        </div>
      </section>
    </div>
  );
}
