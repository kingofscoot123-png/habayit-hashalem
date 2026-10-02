import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Failed } from "@/components/sections/Failed";
import { Mechanism } from "@/components/sections/Mechanism";
import { Proof } from "@/components/sections/Proof";
import { Deliverables } from "@/components/sections/Deliverables";
import { Credentials } from "@/components/sections/Credentials";
import { Quotes } from "@/components/sections/Quotes";
import { Start } from "@/components/sections/Start";
import { Objections } from "@/components/sections/Objections";
import { Close } from "@/components/sections/Close";
import { BackgroundShift } from "@/components/BackgroundShift";
import { Nav } from "@/components/Nav";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { content } from "@/content";

export default function Page() {
  return (
    <>
      <Nav />
      <BackgroundShift />
      <Hero />
      <Pain />
      <Failed />
      <Deliverables />
      <Mechanism />
      <Proof />
      <Credentials />
      <Quotes />
      <Start />
      <Objections />
      <Close />
      <footer className="border-t border-white/5 px-6 py-16 text-center text-caption text-ink-soft">
        {content.footer}
      </footer>
      <WhatsAppFab />
    </>
  );
}
