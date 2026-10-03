import { content } from "@/content";
import { Logo } from "@/components/Logo";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#12110e]/78 px-5 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#top" className="min-w-0" aria-label={content.brand}>
          <Logo />
        </a>
        <div className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="#about" className="transition hover:text-accent">
            {content.pain.title}
          </a>
          <a href="#tried" className="transition hover:text-accent">
            {content.failed.title}
          </a>
          <a href="#path" className="transition hover:text-accent">
            {content.path.title}
          </a>
        </div>
        <a
          href={content.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold whitespace-nowrap rounded-button px-4 py-2.5 text-sm font-normal sm:px-6"
        >
          {content.cta}
        </a>
      </div>
    </nav>
  );
}
