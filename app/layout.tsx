import type { Metadata, Viewport } from "next";
import { Heebo, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyContactBar from "@/components/StickyContactBar";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f1b2d",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.subTagline}. שירות מנעולנות מקצועי בחיפה, קריות, נשר, עתלית וטירת כרמל. ${siteConfig.hoursLong}. התקשרו: ${siteConfig.phoneDisplay}`,
  keywords: [
    "מנעולן בחיפה",
    "מנעולן בקריות",
    "פתיחת דלתות",
    "פתיחת רכבים",
    "החלפת צילינדר",
    "מנעולן 24 שעות",
    "מנעולן חירום",
    "אופק מנעולים",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.subTagline,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.subTagline,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  description: siteConfig.subTagline,
  url: siteConfig.domain,
  image: `${siteConfig.domain}/api/og`,
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  priceRange: "$$",
  areaServed: ["חיפה", "קריות", "נשר", "עתלית", "טירת כרמל"].map((name) => ({
    "@type": "City",
    name,
  })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "חיפה",
    addressRegion: "חיפה",
    addressCountry: "IL",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyContactBar />
      </body>
    </html>
  );
}
