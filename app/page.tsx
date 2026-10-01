import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Failed } from "@/components/sections/Failed";
import { Mechanism } from "@/components/sections/Mechanism";
import { Proof } from "@/components/sections/Proof";
import { Deliverables } from "@/components/sections/Deliverables";
import { Start } from "@/components/sections/Start";
import { Objections } from "@/components/sections/Objections";
import { Close } from "@/components/sections/Close";
import { BackgroundShift } from "@/components/BackgroundShift";
import { content } from "@/content";

export default function Page() {
  return (
    <>
      <BackgroundShift />
      <Hero />
      <Pain />
      <Failed />
      <Mechanism />
      <Proof />
      <Deliverables />
      <Start />
      <Objections />
      <Close />
      <footer className="px-6 py-16 text-center text-caption text-ink-soft">
        {content.footer}
      </footer>
    </>
  );
}
