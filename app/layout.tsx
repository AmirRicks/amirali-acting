import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amirali-acting.vercel.app"),
  title: "Amirali Hamzeh — Actor · Salt Lake City",
  description:
    "Amirali Hamzeh is a Salt Lake City–based actor and model. Background credit on Marshals (CBS). Athletic, bilingual English/Farsi, non-union, local hire across Utah.",
  openGraph: {
    title: "Amirali Hamzeh — Actor",
    description:
      "Salt Lake City–based actor & model. Marshals (CBS) background credit. Athletic · EN/Farsi · Non-union.",
    images: ["/photos/hero-suit.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
