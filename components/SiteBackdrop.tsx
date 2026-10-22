"use client";

/** Fixed editorial canvas — warm cream layers only, no blurry orbs or watermarks. */
export function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <div className="site-backdrop__scene site-backdrop__scene--hero" />
      <div className="site-backdrop__scene site-backdrop__scene--calm" />
      <div className="site-backdrop__scene site-backdrop__scene--treat" />
      <div className="site-backdrop__scene site-backdrop__scene--tools" />
      <div className="site-backdrop__scene site-backdrop__scene--trust" />
      <div className="site-backdrop__scene site-backdrop__scene--warm" />
    </div>
  );
}
