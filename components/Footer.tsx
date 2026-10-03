import Link from "next/link";
import { content } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <p className="text-caption text-ink-soft">{content.footer}</p>
        <p className="text-caption text-ink-soft">{content.legal.clinic}</p>
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
