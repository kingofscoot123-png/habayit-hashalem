import type { Metadata } from "next";
import { IBM_Plex_Sans_Hebrew } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const plex = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kingofscoot123-png.github.io/habayit-hashalem"),
  title: "הבית השלם — מיכאל מרום",
  description:
    "טיפול זוגי ורגשי בראש העין. חוזרים לקרבה שהייתה לפני שהשיחות נשברו.",
  openGraph: {
    title: "הבית השלם — מיכאל מרום",
    description: "טיפול זוגי ורגשי בראש העין.",
    images: [{ url: "/images/og.svg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={plex.variable}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
