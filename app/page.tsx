import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Path } from "@/components/sections/Path";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Pain />
      <Path />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
