import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Treat } from "@/components/sections/Treat";
import { Methods } from "@/components/sections/Methods";
import { About } from "@/components/sections/About";
import { Why } from "@/components/sections/Why";
import { Credentials } from "@/components/sections/Credentials";
import { Quotes } from "@/components/sections/Quotes";
import { Faq } from "@/components/sections/Faq";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

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
      <Credentials />
      <Quotes />
      <Faq />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
