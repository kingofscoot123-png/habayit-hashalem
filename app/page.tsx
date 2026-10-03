import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Failed } from "@/components/sections/Failed";
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
      <Failed />
      <Path />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
