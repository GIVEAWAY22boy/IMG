import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MvjHub | Exclusive Stock Photography",
  description: "A premium, curated collection of handmade and exclusive stock imagery. Discover breathtaking, high-end editorial stock photography for your brand.",
  keywords: ["stock photography", "premium images", "exclusive photos", "editorial stock", "high-end assets", "MvjHub", "digital assets"],
  openGraph: {
    title: "MvjHub | Exclusive Stock Photography",
    description: "A premium, curated collection of handmade and exclusive stock imagery.",
    url: "https://mvjhub.com",
    siteName: "MvjHub",
    images: [
      {
        url: "https://mvjhub.com/premium_1.jpg",
        width: 1200,
        height: 630,
        alt: "MvjHub Exclusive Stock",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MvjHub | Exclusive Stock Photography",
    description: "A premium, curated collection of handmade and exclusive stock imagery.",
    images: ["https://mvjhub.com/premium_1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${cormorant.variable} font-sans antialiased bg-premium-bg text-premium-text flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
