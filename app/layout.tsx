import type { Metadata, Viewport } from "next";
import { Heebo, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { services, siteConfig } from "@/lib/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";

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
    "מנעולן זול בחיפה",
    "פתיחת דלתות בחיפה",
    "החלפת מנעולים בחיפה",
    "פתיחת רכבים בחיפה",
    "החלפת צילינדר בחיפה",
    "מנעולן 24 שעות",
    "מנעולן חירום",
    "מנעולן מוסמך חיפה",
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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "@id": `${siteConfig.domain}/#business`,
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  description: siteConfig.subTagline,
  url: siteConfig.domain,
  image: `${siteConfig.domain}/og-image.jpg`,
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "שירותי מנעולנות",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.short,
        url: `${siteConfig.domain}/services#${s.slug}`,
      },
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: siteConfig.happyCustomers,
    bestRating: "5",
    worstRating: "1",
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
        <main className="flex-1 pb-32 sm:pb-0">{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
