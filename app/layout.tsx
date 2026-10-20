import type { Metadata } from "next";
import { Assistant, Heebo } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SiteBackdrop } from "@/components/SiteBackdrop";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

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
    <html lang="he" dir="rtl" data-scene="hero" className={`${heebo.variable} ${assistant.variable}`}>
      <body className={`${assistant.className} font-sans antialiased`}>
        <SiteBackdrop />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
