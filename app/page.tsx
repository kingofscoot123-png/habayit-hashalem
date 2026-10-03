import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Failed } from "@/components/sections/Failed";
import { Proof } from "@/components/sections/Proof";
import { Deliverables } from "@/components/sections/Deliverables";
import { Credentials } from "@/components/sections/Credentials";
import { Quotes } from "@/components/sections/Quotes";
import { Journey } from "@/components/sections/Journey";
import { Objections } from "@/components/sections/Objections";
import { Close } from "@/components/sections/Close";
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
      <Deliverables />
      <Journey />
      <Proof />
      <Credentials />
      <Quotes />
      <Objections />
      <Close />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
