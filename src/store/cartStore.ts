import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  title: string;
  price_usd: number;
  image_url: string;
};

type CartState = {
  currency: 'USD' | 'INR';
  cart: CartItem[];
  initCurrency: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

// Fixed conversion rate for regional pricing (1 USD = 96.26 INR)
export const getPrice = (usdPrice: number, currency: 'USD' | 'INR') => {
  if (currency === 'INR') {
    return Math.floor(usdPrice * 96.26);
  }
  return usdPrice;
};

export const formatPrice = (usdPrice: number, currency: 'USD' | 'INR') => {
  if (currency === 'INR') {
    return '₹' + getPrice(usdPrice, currency).toLocaleString('en-IN');
  }
  return '$' + usdPrice.toFixed(2);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      currency: 'USD',
      cart: [],
      initCurrency: () => {
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (tz === 'Asia/Calcutta' || tz === 'Asia/Kolkata') {
            set({ currency: 'INR' });
          }
        } catch (e) {
          console.error("Failed to detect timezone", e);
        }
      },
      addToCart: (item) => {
        const cart = get().cart;
        if (!cart.find(i => i.id === item.id)) {
          set({ cart: [...cart, item] });
        }
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter(i => i.id !== id) });
      }
    }),
    {
      name: 'mvjhub-cart-storage',
    }
  )
);
