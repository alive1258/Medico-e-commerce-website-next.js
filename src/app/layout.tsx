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

export const metadata: Metadata = {
  title: "BD Central Health Network | 64 Districts Emergency Hub",
  description:
    "A centralized platform tracking doctor directories, hospital seat availability, blood donor networks, and emergency ambulances across 64 districts in Bangladesh.",
  keywords: [
    "BD Central Health",
    "Bangladesh health network",
    "doctor directory",
    "hospital seat tracker",
    "blood donor network",
    "emergency ambulance",
  ],
  authors: [{ name: "Zamirul Kabir" }],
  openGraph: {
    title: "BD Central Health Network | 64 Districts Emergency Hub",
    description:
      "A centralized platform tracking doctor directories, hospital seat availability, blood donor networks, and emergency ambulances across 64 districts in Bangladesh.",
    url: "https://zamirulkabir.com", // Update with your actual domain when ready
    siteName: "BD Central Health",
    images: [
      {
        url: "https://ibb.co.com/2YKmsVf2",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BD Central Health Network | 64 Districts Emergency Hub",
    description:
      "A centralized platform tracking doctor directories, hospital seat availability, blood donor networks, and emergency ambulances across 64 districts in Bangladesh.",
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
        {/* Dynamic sub-layouts (like your CommonLayout) will render cleanly here */}
        {children}

        {/* Google Analytics 4 Setup */}
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
