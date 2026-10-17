import type { Metadata } from "next";
import {
  Frank_Ruhl_Libre,
  Montserrat,
  Oswald,
  Playfair_Display,
  Raleway,
  Roboto_Slab,
  Rubik,
} from "next/font/google";
import { Providers } from "@/components/Providers";
import { SiteBackdrop } from "@/components/SiteBackdrop";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-oswald",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-roboto-slab",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-raleway",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew"],
  weight: ["500", "700"],
  variable: "--font-frank",
  display: "swap",
});

const fontVars = [
  playfair.variable,
  oswald.variable,
  montserrat.variable,
  robotoSlab.variable,
  raleway.variable,
  rubik.variable,
  frank.variable,
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://habayit-hashalem.vercel.app"),
  title: "הבית השלם · מיכאל מרום",
  description:
    "טיפול זוגי ורגשי בראש העין. חוזרים לקרבה שהייתה לפני שהשיחות נשברו.",
  openGraph: {
    title: "הבית השלם · מיכאל מרום",
    description: "טיפול זוגי ורגשי בראש העין.",
    images: [{ url: "images/hero-desktop.jpg", width: 1600, height: 900 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" data-scene="hero" className={fontVars}>
      <body className={`${rubik.className} font-sans antialiased`}>
        <SiteBackdrop />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
