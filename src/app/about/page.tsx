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
      <section className="py-24 px-6 bg-premium-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-premium-text mb-12">The Manifesto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <h3 className="font-serif text-2xl text-premium-orange mb-4">01. Handmade</h3>
              <p className="text-premium-text/70 font-light">Every asset is meticulously crafted, focusing on texture, lighting, and composition that evokes raw emotion.</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-premium-orange mb-4">02. Exclusive</h3>
              <p className="text-premium-text/70 font-light">We deliberately limit our library. You won't find millions of vectors here; only a curated few hundred masterpieces.</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-premium-orange mb-4">03. Impactful</h3>
              <p className="text-premium-text/70 font-light">Imagery that stops the scroll. Designed for high-end editorial layouts, premium websites, and luxury brands.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
