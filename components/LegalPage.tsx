import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { content } from "@/content";

type Props = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalPage({ title, updated, children }: Props) {
  return (
    <>
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" aria-label={content.brand}>
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-ink-soft transition hover:text-accent">
            חזרה לאתר
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">מידע משפטי</p>
        <h1 className="text-h2">{title}</h1>
        <p className="mt-3 text-caption text-ink-soft">עודכן לאחרונה: {updated}</p>
        <div className="legal-copy mt-10 space-y-6 text-body leading-relaxed text-ink-soft">{children}</div>
      </article>
      <Footer />
    </>
  );
}
