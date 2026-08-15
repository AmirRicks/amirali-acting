import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";

const SITE = "https://amirali-acting.vercel.app";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Amirali Hamzeh — Actor · Salt Lake City",
  description:
    "Amirali Hamzeh is a Salt Lake City–based actor and model. Background credits on Marshals (CBS) and The Wayfinders. Athletic build, bilingual English/Farsi, non-union, local hire across Utah.",
  keywords: [
    "Amirali Hamzeh",
    "Salt Lake City actor",
    "Utah actor",
    "Utah background actor",
    "Utah extras casting",
    "non-union actor Utah",
    "Middle Eastern actor",
    "Farsi speaking actor",
    "athletic actor Utah",
  ],
  authors: [{ name: "Amirali Hamzeh" }],
  creator: "Amirali Hamzeh",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE,
    siteName: "Amirali Hamzeh — Actor",
    title: "Amirali Hamzeh — Actor · Salt Lake City",
    description:
      "Salt Lake City–based actor & model. Marshals (CBS) and The Wayfinders background credits. Athletic · EN/Farsi · Non-union · Utah local hire.",
    images: [
      {
        url: "/photos/hero-suit.jpg",
        width: 1800,
        height: 1196,
        alt: "Amirali Hamzeh — Salt Lake City actor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amirali Hamzeh — Actor · Salt Lake City",
    description:
      "Salt Lake City–based actor & model. Athletic · EN/Farsi · Non-union · Utah local hire.",
    images: ["/photos/hero-suit.jpg"],
  },
};

/* Person schema — lets Google and AI search describe him correctly.
   Every value here must stay in sync with the vault credits log. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amirali Hamzeh",
  alternateName: "Amir Hamzeh",
  url: SITE,
  image: `${SITE}/photos/hero-suit.jpg`,
  jobTitle: "Actor",
  email: "mailto:amirali.hamzeh@gmail.com",
  telephone: "+1-804-982-2814",
  gender: "Male",
  height: "5 ft 8 in",
  knowsLanguage: ["English", "Persian"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salt Lake City",
    addressRegion: "UT",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/in/amirali-hamzeh",
    "https://www.instagram.com/amirali.hamzeh.official/",
    "https://www.tiktok.com/@amirali.hamzeh",
    "https://utahactors.ning.com/members/AmiraliHamzeh",
  ],
  performerIn: [
    {
      "@type": "TVSeries",
      name: "Marshals",
      productionCompany: {
        "@type": "Organization",
        name: "Paramount Television Studios",
      },
    },
    { "@type": "TVSeries", name: "The Wayfinders" },
  ],
  knowsAbout: [
    "Background acting",
    "Commercial acting",
    "Print modeling",
    "Weightlifting",
    "Boxing",
    "Wrestling",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
