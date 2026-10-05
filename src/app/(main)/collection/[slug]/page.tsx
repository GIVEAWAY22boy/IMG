"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, formatPrice } from "@/store/cartStore";
import { useState, use, useEffect } from "react";
import ErrorTV from "@/components/ErrorTV";

export default function ImageSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const currency = useCartStore((state) => state.currency);

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const [image, setImage] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { supabase } = await import("@/lib/supabase");

      const { data } = await supabase
        .from("images")
        .select("*")
        .eq("id", resolvedParams.slug)
        .single();

      if (data) setImage(data);

      const { data: recs } = await supabase
        .from("images")
        .select("*")
        .neq("id", resolvedParams.slug)
        .order("created_at", { ascending: false })
        .limit(8);

      if (recs) setRecommendations(recs);

      setLoading(false);
    };
    fetchData();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-premium-bg flex items-center justify-center">
        <div className="loader scale-150"></div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen bg-premium-bg pt-20">
        <ErrorTV bgText="OOPS" screenText="MISSING ASSET" />
      </div>
    );
  }

  const inCart = cart.some((item) => item.id === image.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this premium asset on MvjHub: ${image.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-premium-bg pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top Section: Image & Details */}
        <div className="flex flex-col lg:flex-row gap-12 mb-32">
          {/* Main Image */}
          <div className="lg:w-3/5 relative flex items-center justify-center">
            <div className="w-full flex justify-center">
              <img
                src={image.watermarked_url}
                alt={image.title}
                className="w-full h-auto rounded-md max-h-[80vh] object-contain"
              />
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:w-2/5 flex flex-col justify-center sticky top-32 h-fit lg:pl-8">
            <Link href="/collection" className="text-premium-text/50 hover:text-premium-orange transition-colors text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Collection
            </Link>

            <h1 className="font-serif text-5xl md:text-6xl text-premium-text mb-4 leading-tight">{image.title}</h1>
            <div className="text-3xl text-premium-orange font-medium mb-8">
              {formatPrice(image.price_usd, currency)}
            </div>

            <p className="text-premium-text/70 font-light leading-relaxed mb-8 text-lg">
              {image.description || "An exclusive high-end editorial portrait emphasizing visceral shadows and minimalist texture. Perfect for luxury branding or hero sections."}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {(image.tags || []).map((tag: string) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-premium-border/60 text-xs uppercase tracking-widest text-premium-text/60">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {inCart ? (
                <Link
                  href="/checkout"
                  className="w-full py-5 rounded-full uppercase tracking-widest text-sm font-bold transition-all shadow-lg flex justify-center items-center gap-3 bg-premium-text text-white hover:bg-premium-orange"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Proceed to Checkout
                </Link>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      addToCart({
                        id: image.id,
                        title: image.title,
                        price_usd: image.price_usd,
                        image_url: image.watermarked_url
                      });
                    }}
                    className="flex-1 py-5 rounded-full uppercase tracking-widest text-sm font-bold transition-all shadow-sm bg-premium-surface text-premium-text border border-premium-border/80 hover:border-premium-orange hover:text-premium-orange"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart({
                        id: image.id,
                        title: image.title,
                        price_usd: image.price_usd,
                        image_url: image.watermarked_url
                      });
                      window.location.href = '/checkout';
                    }}
                    className="flex-1 py-5 rounded-full uppercase tracking-widest text-sm font-bold transition-all shadow-lg bg-premium-orange text-white hover:bg-premium-text"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              <button
                onClick={handleShare}
                className="w-full py-4 rounded-full border border-premium-border/80 text-premium-text uppercase tracking-widest text-xs font-bold hover:border-premium-orange hover:text-premium-orange transition-colors flex justify-center items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                {copied ? 'Copied Link' : 'Share Asset'}
              </button>
            </div>

            <p className="text-xs text-premium-text/40 mt-8 text-center flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Secure One-Time Licensing
            </p>
          </div>
        </div>

        {/* Bottom Section: Suggestions */}
        {recommendations.length > 0 && (
          <div className="border-t border-premium-border/60 pt-20">
            <h2 className="font-serif text-4xl text-premium-text mb-12 text-center">More from the Vault</h2>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
              {recommendations.map((img) => (
                <div key={img.id} className="break-inside-avoid relative group overflow-hidden rounded-md cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <div className="absolute inset-0 bg-premium-text/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
                  <Link href={`/collection/${img.id}`} className="relative w-full block">
                    <img
                      src={img.watermarked_url}
                      alt={img.title}
                      className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end">
                    <h3 className="text-white font-serif text-xl">{img.title}</h3>
                    <p className="text-white/80 text-sm font-light mt-1">
                      {formatPrice(img.price_usd, currency)} • View License ↗
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
