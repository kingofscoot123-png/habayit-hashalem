import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Treat } from "@/components/sections/Treat";
import { Methods } from "@/components/sections/Methods";
import { About } from "@/components/sections/About";
import { Why } from "@/components/sections/Why";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Quotes } from "@/components/sections/Quotes";
import { Posts } from "@/components/sections/Posts";
import { Faq } from "@/components/sections/Faq";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Pain />
      <Treat />
      <Methods />
      <About />
      <Why />
      <ImpactStats />
      <Quotes />
      <Posts />
      <Faq />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
