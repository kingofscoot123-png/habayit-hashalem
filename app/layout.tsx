import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
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
    <html lang="he" dir="rtl" className={`${rubik.variable} ${rubik.className}`}>
      <body className={`${rubik.className} font-sans antialiased`}>
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
