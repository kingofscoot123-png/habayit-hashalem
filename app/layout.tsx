import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kingofscoot123-png.github.io/habayit-hashalem"),
  title: "הבית השלם · מיכאל מרום",
  description:
    "טיפול זוגי ורגשי בראש העין. חוזרים לקרבה שהייתה לפני שהשיחות נשברו.",
  openGraph: {
    title: "הבית השלם · מיכאל מרום",
    description: "טיפול זוגי ורגשי בראש העין.",
    images: [{ url: "/images/hero-desktop.jpg", width: 1600, height: 900 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${heebo.className}`}>
      <body className={`${heebo.className} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
