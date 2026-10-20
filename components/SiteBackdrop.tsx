"use client";

const ATMOS = {
  calm: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=80",
  treat: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80",
  tools: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
  trust: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1800&q=80",
  warm: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
} as const;

/** Fixed ambient layer: cinematic scenes, clinic atmosphere photos, orbs. */
export function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <div className="site-backdrop__scene site-backdrop__scene--hero" />
      <div className="site-backdrop__scene site-backdrop__scene--calm" />
      <div className="site-backdrop__scene site-backdrop__scene--treat" />
      <div className="site-backdrop__scene site-backdrop__scene--tools" />
      <div className="site-backdrop__scene site-backdrop__scene--trust" />
      <div className="site-backdrop__scene site-backdrop__scene--warm" />
      <div className="site-backdrop__photo site-backdrop__photo--calm" style={{ backgroundImage: `url(${ATMOS.calm})` }} />
      <div className="site-backdrop__photo site-backdrop__photo--treat" style={{ backgroundImage: `url(${ATMOS.treat})` }} />
      <div className="site-backdrop__photo site-backdrop__photo--tools" style={{ backgroundImage: `url(${ATMOS.tools})` }} />
      <div className="site-backdrop__photo site-backdrop__photo--trust" style={{ backgroundImage: `url(${ATMOS.trust})` }} />
      <div className="site-backdrop__photo site-backdrop__photo--warm" style={{ backgroundImage: `url(${ATMOS.warm})` }} />
      <div className="site-backdrop__veil" />
      <div className="site-backdrop__dots" />
      <div className="site-backdrop__orb site-backdrop__orb--a" data-parallax="-48" />
      <div className="site-backdrop__orb site-backdrop__orb--b" data-parallax="32" />
      <div className="site-backdrop__orb site-backdrop__orb--c" data-parallax="-72" />
      <div className="site-backdrop__orb site-backdrop__orb--d" data-parallax="56" />
    </div>
  );
}
