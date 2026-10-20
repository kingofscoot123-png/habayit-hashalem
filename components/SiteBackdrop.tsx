"use client";

import { asset } from "@/lib/asset";

/** Fixed ambient layer: cinematic scenes, clinic photos, dot grid, soft orbs. */
export function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <div className="site-backdrop__scene site-backdrop__scene--hero" />
      <div className="site-backdrop__scene site-backdrop__scene--calm" />
      <div className="site-backdrop__scene site-backdrop__scene--treat" />
      <div className="site-backdrop__scene site-backdrop__scene--tools" />
      <div className="site-backdrop__scene site-backdrop__scene--trust" />
      <div className="site-backdrop__scene site-backdrop__scene--warm" />
      <div
        className="site-backdrop__photo site-backdrop__photo--calm"
        style={{ backgroundImage: `url(${asset("/images/treatment-calm.jpg")})` }}
      />
      <div
        className="site-backdrop__photo site-backdrop__photo--treat"
        style={{ backgroundImage: `url(${asset("/images/start-clinic.jpg")})` }}
      />
      <div
        className="site-backdrop__photo site-backdrop__photo--tools"
        style={{ backgroundImage: `url(${asset("/images/treatment-couple.jpg")})` }}
      />
      <div
        className="site-backdrop__photo site-backdrop__photo--trust"
        style={{ backgroundImage: `url(${asset("/images/pain-home.jpg")})` }}
      />
      <div
        className="site-backdrop__photo site-backdrop__photo--warm"
        style={{ backgroundImage: `url(${asset("/images/start-home.jpg")})` }}
      />
      <div className="site-backdrop__dots" />
      <div className="site-backdrop__orb site-backdrop__orb--a" data-parallax="-48" />
      <div className="site-backdrop__orb site-backdrop__orb--b" data-parallax="32" />
      <div className="site-backdrop__orb site-backdrop__orb--c" data-parallax="-72" />
      <div className="site-backdrop__orb site-backdrop__orb--d" data-parallax="56" />
    </div>
  );
}
