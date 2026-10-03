import Image from "next/image";

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
    { src: "/premium_5.jpg", alt: "Golden Flows", height: 650 },
    { src: "/premium_4.jpg", alt: "Fashion Edit", height: 500 },
  ];

  return (
    <div className="min-h-screen bg-premium-bg">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 flex flex-col items-center justify-center overflow-hidden">
        {/* Warm Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-premium-orange-light/30 via-premium-bg to-premium-bg z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-premium-orange/10 via-transparent to-transparent opacity-80"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-sm font-bold mb-6 block">
            The Exclusive Collection
          </span>
          <h1 className="font-serif text-6xl md:text-8xl font-medium text-premium-text leading-tight mb-8">
            Curated visual artistry.
          </h1>
          <p className="text-premium-text/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            Discover our handpicked, premium stock imagery. Exclusive licenses for creators who demand perfection.
          </p>
          
          {/* Aesthetic minimalist search */}
          <div className="w-full max-w-xl relative group">
            <input 
              type="text" 
              placeholder="Search the archive..." 
              className="w-full bg-transparent border-b border-premium-text/20 py-4 px-2 text-premium-text placeholder-premium-text/40 focus:outline-none focus:border-premium-orange transition-colors duration-500 font-serif text-2xl text-center italic"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-24 px-6 md:px-10 max-w-[1600px] mx-auto mt-10">
        <div className="flex justify-between items-end mb-16 border-b border-premium-border/60 pb-8">
          <div>
            <h2 className="font-serif text-4xl text-premium-text mb-2">Latest Additions</h2>
            <p className="text-premium-text/60 font-light">Meticulously crafted, exclusively yours.</p>
          </div>
          <button className="text-premium-orange uppercase tracking-widest text-xs font-bold hover:text-premium-text transition-colors">
            View All
          </button>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {images.map((img, idx) => (
             <div key={idx} className="break-inside-avoid relative group overflow-hidden rounded-md cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500">
               <div className="absolute inset-0 bg-premium-text/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
               <div className="relative w-full">
                 <Image 
                   src={img.src} 
                   alt={img.alt}
                   width={800}
                   height={img.height}
                   className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
               </div>
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-premium-text/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex justify-between items-end">
                 <div>
                   <h3 className="text-white font-serif text-xl">{img.alt}</h3>
                   <p className="text-white/80 text-sm font-light mt-1">$49.00 USD</p>
                 </div>
                 <button className="w-10 h-10 rounded-full bg-white text-premium-text flex items-center justify-center hover:bg-premium-orange hover:text-white transition-colors shadow-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                 </button>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
