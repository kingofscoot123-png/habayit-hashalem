import type { Metadata } from "next";
import { Assistant, Heebo } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SiteBackdrop } from "@/components/SiteBackdrop";
import { asset } from "@/lib/asset";
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

const FONTSHARE =
  "https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=satoshi@700,500,400&display=swap";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      data-scene="hero"
      data-rev="studio-100k"
      className={`${heebo.variable} ${assistant.variable} ${heebo.className}`}
      style={{
        ["--artwork-mobile" as string]: `url("${asset("/bg-mobile.jpg")}")`,
        ["--artwork-desktop" as string]: `url("${asset("/bg-desktop.jpg")}")`,
      }}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href={FONTSHARE} />
      </head>
      <body
        className={`${assistant.className} studio-body antialiased bg-[url('/bg-mobile.jpg')] bg-cover bg-fixed bg-center md:bg-[url('/bg-desktop.jpg')]`}
      >
        <SiteBackdrop />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
