import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SetmoreTrigger } from "@/components/ui/SetmoreButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Masoy Rehabilitación",
  "alternateName": "Masoterapia y Rehabilitación La Florida",
  "description": "Centro especializado en masoterapia y rehabilitación en La Florida, Santiago. Masajes descontracturantes, deportivos y relajantes. Atención para todas las edades.",
  "url": "https://masoy-rehabilitacion.vercel.app",
  "telephone": "+56942142229",
  "email": "Masoyrehabilitacion@gmail.com",
  "image": "https://masoy-rehabilitacion.vercel.app/images/564575294_18002891396827903_7842854950051613160_n.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Froilán Roa #6333",
    "addressLocality": "La Florida",
    "addressRegion": "Región Metropolitana",
    "addressCountry": "CL",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -33.5309,
    "longitude": -70.5821,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "14:00",
    },
  ],
  "priceRange": "$$",
  "currenciesAccepted": "CLP",
  "paymentAccepted": "Cash, Credit Card",
  "sameAs": [
    "https://www.instagram.com/rocio.masoterapia",
    "https://masoyrehabilitacion.setmore.com",
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Masoterapia",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Masaje Relajante",
          "description": "Técnica suave que reduce el estrés, alivia la tensión nerviosa y promueve el bienestar general.",
        },
        "price": "34000",
        "priceCurrency": "CLP",
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Masaje Descontracturante",
          "description": "Técnica específica para liberar contracturas musculares acumuladas en zonas cervicales, dorsales y lumbares.",
        },
        "price": "34000",
        "priceCurrency": "CLP",
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Masaje Deportivo",
          "description": "Diseñado para deportistas. Mejora el rendimiento, previene lesiones y acelera la recuperación post-entrenamiento.",
        },
        "price": "34000",
        "priceCurrency": "CLP",
      },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://masoy-rehabilitacion.vercel.app"),
  title: {
    default: "Masoy Rehabilitación | Masajes en La Florida, Santiago",
    template: "%s | Masoy Rehabilitación",
  },
  description:
    "Centro de masoterapia en La Florida, Santiago. Masajes relajantes, descontracturantes y deportivos desde $34.000 (60 min). Agenda online o por WhatsApp. Froilán Roa #6333.",
  keywords: [
    "masajes La Florida",
    "masoterapia La Florida",
    "masaje relajante Santiago",
    "masaje descontracturante",
    "masaje deportivo Santiago",
    "centro masajes La Florida",
    "kinesiología La Florida",
    "masajes económicos Santiago",
    "masaje 34000",
    "masoterapia Santiago",
    "rehabilitación La Florida",
    "Froilán Roa masajes",
  ],
  authors: [{ name: "Masoy Rehabilitación" }],
  creator: "Masoy Rehabilitación",
  publisher: "Masoy Rehabilitación",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://masoy-rehabilitacion.vercel.app",
    title: "Masoy Rehabilitación | Masajes en La Florida, Santiago",
    description:
      "Centro de masoterapia en La Florida. Masajes relajantes, descontracturantes y deportivos desde $34.000 los 60 min. Agenda tu hora hoy.",
    siteName: "Masoy Rehabilitación",
    images: [
      {
        url: "/images/564575294_18002891396827903_7842854950051613160_n.webp",
        width: 1200,
        height: 630,
        alt: "Masoy Rehabilitación - Centro de Masoterapia La Florida",
      },
    ],
  },
  alternates: {
    canonical: "https://masoy-rehabilitacion.vercel.app",
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <SetmoreTrigger />
        {children}
      </body>
    </html>
  );
}
