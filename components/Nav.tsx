import { content } from "@/content";
import { Logo } from "@/components/Logo";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b0f19]/72 px-6 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#top" className="min-w-0" aria-label={content.brand}>
          <Logo />
        </a>
        <div className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="#about" className="transition hover:text-accent">
            הגישה שלי
          </a>
          <a href="#services" className="transition hover:text-accent">
            תחומי טיפול
          </a>
          <a href="#process" className="transition hover:text-accent">
            תהליך העבודה
          </a>
          <a href="#credentials" className="transition hover:text-accent">
            הסמכות
          </a>
        </div>
        <a href={content.phoneHref} className="btn-gold whitespace-nowrap rounded-button px-4 py-2.5 text-sm font-bold sm:px-6">
          <span className="sm:hidden">ייעוץ</span>
          <span className="hidden sm:inline">שיחת ייעוץ מהירה</span>
        </a>
      </div>
    </nav>
  );
}
