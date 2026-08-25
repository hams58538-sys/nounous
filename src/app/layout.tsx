import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://edenagency.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eden Agency — Placement de Nounous & Ménagères à Douala et Yaoundé",
    template: "%s | Eden Agency",
  },
  description:
    "Eden Agency place des nounous et ménagères de confiance à Douala et Yaoundé. Personnel vérifié, sélection rigoureuse, accompagnement personnalisé.",
  keywords: [
    "nounou Douala",
    "ménagère Douala",
    "nounou Yaoundé",
    "ménagère Yaoundé",
    "agence de placement Cameroun",
    "personnel de maison Cameroun",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eden Agency — Confiance, Qualité, Sérénité",
    description:
      "Placement de nounous et ménagères de confiance à Douala et Yaoundé.",
    url: SITE_URL,
    siteName: "Eden Agency",
    locale: "fr_CM",
    type: "website",
    images: [
      {
        url: "/logo-full.png",
        width: 1080,
        height: 1080,
        alt: "Éden — agence spécialisée dans le placement des nounous et ménagères",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Eden Agency — Confiance, Qualité, Sérénité",
    description:
      "Placement de nounous et ménagères de confiance à Douala et Yaoundé.",
    images: ["/logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B3B2E",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Eden Agency",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.png`,
  description:
    "Agence de placement de nounous et ménagères de confiance à Douala et Yaoundé, Cameroun.",
  areaServed: [
    { "@type": "City", name: "Douala" },
    { "@type": "City", name: "Yaoundé" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+237670638233",
      contactType: "customer service",
      areaServed: "Douala",
      availableLanguage: ["French"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+237657990371",
      contactType: "customer service",
      areaServed: "Yaoundé",
      availableLanguage: ["French"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${fraunces.variable} ${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
