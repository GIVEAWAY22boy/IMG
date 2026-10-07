"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore, formatPrice } from "@/store/cartStore";

export default function Collection() {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const currency = useCartStore((state) => state.currency);

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input to avoid spamming the database
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadImages = async (pageNum: number, search: string, reset: boolean) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    const limit = 25;
    const start = (pageNum - 1) * limit;
    const end = start + limit - 1;

    const { supabase } = await import("@/lib/supabase");
    let query = supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false })
      .range(start, end);

    if (search.trim() !== "") {
      // Search by title (server-side)
      query = query.ilike("title", `%${search.trim()}%`);
    }

    const { data } = await query;

    if (data) {
      if (reset) {
        setImages(data);
      } else {
        setImages(prev => [...prev, ...data]);
      }
      setHasMore(data.length === limit);
    }
    
    setLoading(false);
    setLoadingMore(false);
  };

  // Fetch whenever debounced search changes
  useEffect(() => {
    setPage(1);
    loadImages(1, debouncedSearch, true);
  }, [debouncedSearch]);

  const handleLoadMore = () => {
    if (loadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadImages(nextPage, debouncedSearch, false);
  };

  return (
    <div className="min-h-screen bg-premium-bg">
      <section className="py-24 px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="mb-16 border-b border-premium-border/60 pb-8 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-premium-text mb-4">The Collection</h1>
          <p className="text-premium-text/60 font-light text-lg max-w-2xl mx-auto">Browse our entire archive of premium, handmade, and exclusive stock photography.</p>

          <div className="flex justify-center mt-8">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, tag, or keyword..."
                className="w-full bg-premium-surface border border-premium-border/80 rounded-full py-4 pl-12 pr-6 text-premium-text focus:outline-none focus:border-premium-orange transition-colors shadow-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-premium-text/40" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="w-full flex justify-center items-center min-h-[40vh]">
            <div className="loader scale-150"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="w-full py-20 text-center text-premium-text/60">No assets found matching your search.</div>
        ) : (
          <>
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
              {images.map((img) => {
                const inCart = cart.some((item) => item.id === img.id);
                return (
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
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex justify-between items-end">
                      <div>
                        <h3 className="text-white font-serif text-xl">{img.title}</h3>
                        <p className="text-white/80 text-sm font-light mt-1">
                          {formatPrice(img.price_usd, currency)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (!inCart) {
                            addToCart({
                              id: img.id,
                              title: img.title,
                              price_usd: img.price_usd,
                              image_url: img.watermarked_url
                            });
                          }
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${inCart ? 'bg-premium-orange text-white cursor-default' : 'bg-white text-premium-text hover:bg-premium-orange hover:text-white'}`}
                      >
                        {inCart ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <div className="mt-20 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-10 py-4 rounded-full border border-premium-border/80 text-sm uppercase tracking-widest font-bold text-premium-text hover:border-premium-orange hover:text-premium-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-premium-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Loading...
                    </>
                  ) : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
