import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Rocío Masoterapia",
  "alternateName": "Rocío Abarzúa Masoterapia a Domicilio",
  "description": "Masaje a domicilio en Santiago. Rocío Abarzúa Torrealba lleva camilla profesional, toallas, música y aromaterapia para que vivas una experiencia de bienestar y renovación en la calidez de tu hogar.",
  "url": "https://rocio-masoterapia.vercel.app",
  "telephone": "+56942142229",
  "areaServed": {
    "@type": "City",
    "name": "Santiago",
    "addressCountry": "CL",
  },
  "image": "https://rocio-masoterapia.vercel.app/images/3.jpg.jpeg",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00",
    },
  ],
  "priceRange": "$$",
  "currenciesAccepted": "CLP",
  "paymentAccepted": "Cash, Credit Card, Transfer",
  "sameAs": [
    "https://www.instagram.com/rocio.masoterapia",
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Masaje a Domicilio",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Masaje Relajante a Domicilio",
          "description": "Masaje relajante a domicilio en Santiago. Libera tensiones y reconecta con tu cuerpo.",
        },
        "price": "42000",
        "priceCurrency": "CLP",
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Masaje Descontracturante a Domicilio",
          "description": "Masaje descontracturante a domicilio. Libera contracturas cervicales, dorsales y lumbares.",
        },
        "price": "42000",
        "priceCurrency": "CLP",
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Masaje Deportivo a Domicilio",
          "description": "Masaje deportivo a domicilio en Santiago. Recuperación y rendimiento para deportistas.",
        },
        "price": "42000",
        "priceCurrency": "CLP",
      },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rocio-masoterapia.vercel.app"),
  title: {
    default: "Rocío Masoterapia | Masaje a Domicilio en Santiago",
    template: "%s | Rocío Masoterapia",
  },
  description:
    "Masaje a domicilio en Santiago con Rocío Abarzúa. Camilla, toallas, música y aromaterapia incluidos. Masajes desde $42.000 (60 min). Lunes a sábado 09:00–20:00. Agenda por WhatsApp.",
  keywords: [
    "masaje a domicilio Santiago",
    "masoterapia a domicilio",
    "masaje domicilio Santiago",
    "masaje relajante domicilio",
    "masaje descontracturante domicilio",
    "masaje deportivo domicilio Santiago",
    "masajista a domicilio Santiago",
    "masaje en casa Santiago",
    "Rocío Masoterapia",
    "masaje para dos personas Santiago",
    "masaje pareja domicilio",
    "masoterapia Santiago",
  ],
  authors: [{ name: "Rocío Abarzúa Torrealba" }],
  creator: "Rocío Masoterapia",
  publisher: "Rocío Masoterapia",
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
    url: "https://rocio-masoterapia.vercel.app",
    title: "Rocío Masoterapia | Masaje a Domicilio en Santiago",
    description:
      "Masaje a domicilio en Santiago. Llevo camilla, toallas, música y aromaterapia para que vivas una experiencia de bienestar y renovación en tu hogar. Desde $42.000 los 60 min.",
    siteName: "Rocío Masoterapia",
    images: [
      {
        url: "/images/3.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Rocío Masoterapia - Camilla de masaje a domicilio en Santiago",
      },
    ],
  },
  alternates: {
    canonical: "https://rocio-masoterapia.vercel.app",
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
        {children}
      </body>
    </html>
  );
}
