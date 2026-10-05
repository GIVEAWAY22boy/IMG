import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-premium-bg">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-sm font-bold mb-6 block">
            Our Vision
          </span>
          <h1 className="font-serif text-6xl md:text-8xl text-premium-text leading-[1.1] mb-10">
            Beyond the <br/><span className="italic text-premium-orange">Ordinary.</span>
          </h1>
          <p className="text-xl text-premium-text/70 font-light leading-relaxed max-w-lg">
            MvjHub was forged from a desire to escape the mundane. We curate an exclusive collection of handmade, visceral imagery meant for brands and creators who refuse to settle for generic stock photos.
          </p>
        </div>
        
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-0 bg-premium-orange/10 transform translate-x-4 translate-y-4 rounded-xl -z-10"></div>
          <div className="relative aspect-[4/5] w-full max-w-lg mx-auto shadow-2xl overflow-hidden rounded-xl">
             <Image src="/premium_4.jpg" alt="Editorial Vision" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-32 px-6 bg-premium-surface">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-6xl text-premium-text mb-20">The Manifesto.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
            <div className="group">
              <h3 className="font-serif text-3xl text-premium-orange mb-6 flex items-end gap-4">
                <span className="text-sm font-sans tracking-widest text-premium-text/40 mb-1">01</span> 
                Handmade
              </h3>
              <p className="text-premium-text/70 font-light leading-relaxed text-lg transition-colors group-hover:text-premium-text">Every asset is meticulously crafted, focusing on texture, lighting, and composition that evokes raw, visceral emotion.</p>
            </div>
            <div className="group">
              <h3 className="font-serif text-3xl text-premium-orange mb-6 flex items-end gap-4">
                <span className="text-sm font-sans tracking-widest text-premium-text/40 mb-1">02</span> 
                Exclusive
              </h3>
              <p className="text-premium-text/70 font-light leading-relaxed text-lg transition-colors group-hover:text-premium-text">We deliberately limit our library. You will not find millions of generic vectors here; only a curated vault of undeniable masterpieces.</p>
            </div>
            <div className="group">
              <h3 className="font-serif text-3xl text-premium-orange mb-6 flex items-end gap-4">
                <span className="text-sm font-sans tracking-widest text-premium-text/40 mb-1">03</span> 
                Impactful
              </h3>
              <p className="text-premium-text/70 font-light leading-relaxed text-lg transition-colors group-hover:text-premium-text">Imagery that forces you to stop scrolling. Designed intentionally for high-end editorial layouts, luxury branding, and premium web.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-32 px-6 max-w-[1600px] mx-auto flex flex-col md:flex-row-reverse items-center gap-20">
        <div className="w-full md:w-1/2 lg:pl-20">
          <span className="text-premium-orange uppercase tracking-[0.3em] text-sm font-bold mb-6 block">
            The Process
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-premium-text leading-[1.1] mb-10">
            Curation is an <br/><span className="italic text-premium-orange">Obsession.</span>
          </h2>
          <p className="text-xl text-premium-text/70 font-light leading-relaxed mb-8">
            Our vault isn't filled by algorithms. It is meticulously hand-selected by our curation team. We analyze lighting, composition depth, and emotional resonance before a single file is ever uploaded.
          </p>
          <p className="text-xl text-premium-text/70 font-light leading-relaxed">
            When you purchase a license from MvjHub, you aren't just buying a photo; you are acquiring a piece of digital art designed to elevate your brand's narrative to the absolute pinnacle.
          </p>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[700px]">
          <div className="absolute top-0 left-0 w-3/4 h-[500px] shadow-2xl overflow-hidden rounded-xl z-10">
             <Image src="/premium_3.jpg" alt="Editorial Process 1" fill className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 h-[400px] shadow-2xl overflow-hidden rounded-xl z-20 border-4 border-premium-bg">
             <Image src="/premium_5.jpg" alt="Editorial Process 2" fill className="object-cover" />
          </div>
        </div>
      </section>
      
      {/* Decorative Marquee */}
      <div className="w-full overflow-hidden bg-premium-orange text-white py-6 flex whitespace-nowrap">
        <div className="animate-marquee inline-block font-serif text-4xl italic tracking-wide">
          EXCLUSIVE ASSETS • NO SUBSCRIPTIONS • ONE-TIME LICENSING • VISCERAL IMAGERY • HIGH-END EDITORIAL • 
        </div>
        <div className="animate-marquee inline-block font-serif text-4xl italic tracking-wide" aria-hidden="true">
          EXCLUSIVE ASSETS • NO SUBSCRIPTIONS • ONE-TIME LICENSING • VISCERAL IMAGERY • HIGH-END EDITORIAL • 
        </div>
      </div>
    </div>
  );
}
