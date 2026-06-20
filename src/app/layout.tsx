import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Medico ব্র্যান্ডের জন্য SEO অপ্টিমাইজড মেটাডেটা
export const metadata: Metadata = {
  title: "Medico | Online Medicine & Organic Health Food Delivery in BD",
  description:
    "Order prescription medicines, healthcare products, organic honey, dry fruits, and healthy snacks online from Medico. Trusted pharmacy and wellness shop delivering across Bangladesh.",
  keywords: [
    "Medico",
    "online pharmacy Bangladesh",
    "buy medicine online Dhaka",
    "organic honey shop",
    "dry fruits price in BD",
    "healthy foods online",
    "OTC medicines delivery",
  ],
  authors: [{ name: "Zamirul Kabir" }],
  openGraph: {
    title: "Medico | Online Medicine & Organic Health Food Delivery in BD",
    description:
      "Order prescription medicines, healthcare products, organic honey, dry fruits, and healthy snacks online from Medico. Trusted pharmacy and wellness shop delivering across Bangladesh.",
    url: "https://medico.com.bd", // ডোমেইন অনুযায়ী পরবর্তীতে পরিবর্তন করতে পারবেন
    siteName: "Medico",
    images: [
      {
        url: "https://ibb.co.com/2YKmsVf2", // আপনার লোগো বা ওজি ইমেজের লিংক দিন
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medico | Online Medicine & Organic Health Food Delivery in BD",
    description:
      "Order prescription medicines, healthcare products, organic honey, dry fruits, and healthy snacks online from Medico.",
    images: "https://ibb.co.com/2YKmsVf2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        {/* সমস্ত পেজে এই চিলড্রেন রেন্ডার হবে */}
        {children}

        {/* Google Analytics 4 Setup (আপনার প্রয়োজন অনুযায়ী ট্র্যাকিং আইডি বদলে নিতে পারেন) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-242fdsf2"
          strategy="afterInteractive"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-242fdsf2', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
