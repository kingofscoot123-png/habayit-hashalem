import { asset } from "@/lib/asset";

/** Fixed watercolor artwork behind non-hero sections. Hero video stays untouched. */
export function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <picture>
        <source media="(min-width: 768px)" srcSet={asset("/bg-desktop.jpg")} />
        <img
          src={asset("/bg-mobile.jpg")}
          alt=""
          className="site-artwork__img"
          decoding="async"
        />
      </picture>
      <div className="site-ambient">
        <div className="site-ambient__glow animate-pulse-slow" />
        <div className="site-ambient__stars" />
      </div>
    </div>
  );
}
