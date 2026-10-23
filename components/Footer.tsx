import Link from "next/link";
import { content } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(130,21,43,0.12)] bg-[rgba(250,245,239,0.85)] px-6 py-16 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
        <p className="text-caption tracking-[0.14em] text-[#82152B]">{content.footer}</p>
        <a href={content.phoneHref} className="text-lead text-[#82152B] transition hover:text-burgundy">
          {content.phoneDisplay}
        </a>
        <a
          href={content.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="clinic-address text-caption font-bold transition hover:text-[#C5A059]"
        >
          {content.legal.clinic}
        </a>
        <nav aria-label="מידע משפטי" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/privacy/" className="text-ink-soft transition hover:text-accent">
            {content.legal.privacy}
          </Link>
          <Link href="/terms/" className="text-ink-soft transition hover:text-accent">
            {content.legal.terms}
          </Link>
          <Link href="/cookies/" className="text-ink-soft transition hover:text-accent">
            {content.legal.cookies}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
