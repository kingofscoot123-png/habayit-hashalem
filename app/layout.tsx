import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import { SiteBackdrop } from "@/components/SiteBackdrop";
import { asset } from "@/lib/asset";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://habayit-hashalem.vercel.app"),
  title: "הבית השלם · מיכאל מרום",
  description:
    "טיפול זוגי, רגשי ומשפחתי בראש העין. חוזרים לקרבה שהייתה לפני שהשיחות נשברו.",
  openGraph: {
    title: "הבית השלם · מיכאל מרום",
    description: "טיפול זוגי, רגשי ומשפחתי בראש העין.",
    images: [{ url: "images/treatment-couple.jpg", width: 1600, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "הבית השלם · מיכאל מרום",
    description: "טיפול זוגי, רגשי ומשפחתי בראש העין.",
    images: ["images/treatment-couple.jpg"],
  },
};

const FONTSHARE =
  "https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=satoshi@700,500,400&display=swap";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700&family=Heebo:wght@400;500;700;800;900&display=swap";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      data-scene="hero"
      data-rev="certs-quotes"
      style={{
        ["--font-heebo" as string]: '"Heebo", "Helvetica Neue", Arial, sans-serif',
        ["--font-assistant" as string]: '"Assistant", "Helvetica Neue", Arial, sans-serif',
        ["--artwork-mobile" as string]: `url("${asset("/bg-mobile.jpg")}")`,
        ["--artwork-desktop" as string]: `url("${asset("/bg-desktop.jpg")}")`,
        fontFamily: '"Heebo", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href={GOOGLE_FONTS} />
        <link rel="stylesheet" href={FONTSHARE} />
      </head>
      <body
        className="studio-body antialiased"
        style={{ fontFamily: '"Assistant", "Helvetica Neue", Arial, sans-serif' }}
      >
        <SiteBackdrop />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
