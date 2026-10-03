import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const images = [
    { src: "/premium_1.jpg", alt: "Exclusive Landscape", height: 600 },
    { src: "/premium_2.jpg", alt: "Minimalist Architecture", height: 400 },
    { src: "/premium_3.jpg", alt: "Handmade Texture", height: 500 },
    { src: "/premium_4.jpg", alt: "Moody Portrait", height: 700 },
    { src: "/premium_5.jpg", alt: "Abstract Art", height: 450 },
    { src: "/premium_2.jpg", alt: "Minimalist Details", height: 600 },
    { src: "/premium_1.jpg", alt: "Misty Valleys", height: 550 },
    { src: "/premium_3.jpg", alt: "Artisan Clay", height: 400 },
  ];

  return (
    <div className="min-h-screen bg-premium-bg overflow-x-hidden">
      
      {/* SECTION 1: The Cinematic Hero */}
      <section className="relative h-screen min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/premium_4.jpg" alt="Cinematic Hero Art" fill className="object-cover object-top scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" priority />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-premium-bg"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center mt-20">
          <span className="text-white/80 uppercase tracking-[0.4em] text-xs font-bold mb-8 block backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-white/20">
            MvjHub Exclusive Vault
          </span>
          <h1 className="font-serif text-7xl md:text-8xl lg:text-[8rem] text-white leading-[0.9] tracking-tight mb-8 drop-shadow-2xl">
            Uncommon <br />
            <span className="italic text-premium-orange font-light">Artistry.</span>
          </h1>
          <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md">
            Escape the generic. Access a tightly curated vault of breathtaking, high-end editorial stock photography reserved for brands that demand the extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/collection" className="bg-premium-orange text-white px-10 py-5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-black transition-colors shadow-2xl">
              Explore the Vault
            </Link>
            
            {/* Minimalist Search inside Hero */}
            <div className="w-full sm:w-auto relative group">
              <input 
                type="text" 
                placeholder="Search aesthetics..." 
                className="w-full sm:w-64 bg-white/10 backdrop-blur-md border border-white/30 rounded-full py-4 px-6 text-white placeholder-white/70 focus:outline-none focus:border-premium-orange focus:bg-black/40 transition-all duration-500 font-serif text-lg italic shadow-xl"
              />
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-premium-orange to-transparent"></div>
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
              <Image src="/premium_1.jpg" alt="Featured 1" fill className="object-cover" />
            </div>
            {/* Offset Image 2 */}
            <div className="absolute bottom-0 left-10 w-[50%] h-[450px] shadow-xl rounded-xl overflow-hidden z-10 transition-transform duration-700 hover:translate-y-4">
              <Image src="/premium_3.jpg" alt="Featured 2" fill className="object-cover" />
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
              placeholder="Search aesthetics..." 
              className="w-full bg-transparent border-b border-premium-text/20 py-3 text-premium-text placeholder-premium-text/40 focus:outline-none focus:border-premium-orange transition-colors duration-500 font-serif text-xl italic"
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {images.map((img, idx) => (
             <div key={idx} className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-700">
               <div className="absolute inset-0 bg-premium-text/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
               <div className="relative w-full">
                 <Image 
                   src={img.src} 
                   alt={img.alt}
                   width={800}
                   height={img.height}
                   className="w-full h-auto object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                 />
               </div>
               <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 flex flex-col justify-end h-1/2">
                 <h3 className="text-white font-serif text-2xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</h3>
                 <div className="flex justify-between items-center mt-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                   <p className="text-white/80 text-sm font-light uppercase tracking-widest">$49.00</p>
                   <button className="w-10 h-10 rounded-full bg-premium-orange text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-sm">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                   </button>
                 </div>
               </div>
             </div>
           ))}
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
