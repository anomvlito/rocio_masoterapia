import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masoy Rehabilitación | Masoterapia & Kinesiología · La Florida",
  description:
    "Centro de masajes y rehabilitación en La Florida, Santiago. Masajes descontracturantes, deportivos, relajantes y tratamiento kinésico. Agenda tu hora online.",
  keywords:
    "masajes, masoterapia, kinesiología, La Florida, Santiago, descontracturante, deportivo, relajante",
  openGraph: {
    title: "Masoy Rehabilitación",
    description: "Centro de masajes y rehabilitación en La Florida, Santiago",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
