"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoLoopProps = {
  src: string;
  className?: string;
};

function unlock(el: HTMLVideoElement) {
  el.muted = true;
  el.defaultMuted = true;
  el.playsInline = true;
  el.controls = false;
  el.setAttribute("playsinline", "");
  el.setAttribute("webkit-playsinline", "");
  el.setAttribute("muted", "");
  el.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
  el.setAttribute("x-webkit-airplay", "deny");
  el.removeAttribute("controls");
  el.disablePictureInPicture = true;
  try {
    el.disableRemotePlayback = true;
  } catch {
    /* older browsers */
  }
}

function tryPlay(el: HTMLVideoElement) {
  el.muted = true;
  el.controls = false;
  el.removeAttribute("controls");
  return el.play().catch(() => undefined);
}

/** Seamless crossfade loop — no native controls / play overlays. */
export function HeroVideoLoop({ src, className = "" }: HeroVideoLoopProps) {
  const [front, setFront] = useState(0);
  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const swapping = useRef(false);
  const frontRef = useRef(0);

  useEffect(() => {
    frontRef.current = front;
  }, [front]);

  useEffect(() => {
    const a = v0.current;
    const b = v1.current;
    if (!a || !b) return;

    unlock(a);
    unlock(b);

    const prime = () => {
      const lead = frontRef.current === 0 ? a : b;
      void tryPlay(lead);
    };

    const maybeSwap = (lead: HTMLVideoElement, follow: HTMLVideoElement, nextFront: 0 | 1) => {
      if (!lead.duration || !Number.isFinite(lead.duration) || swapping.current) return;
      const left = lead.duration - lead.currentTime;
      if (left > 0.55 || left <= 0.05) return;

      swapping.current = true;
      follow.currentTime = 0;
      void tryPlay(follow).then(() => {
        setFront(nextFront);
        window.setTimeout(() => {
          // Keep muted loop as safety net; never leave a paused visible layer.
          lead.currentTime = 0;
          lead.pause();
          unlock(lead);
          swapping.current = false;
        }, 750);
      });
    };

    const onA = () => maybeSwap(a, b, 1);
    const onB = () => maybeSwap(b, a, 0);
    const onVis = () => {
      if (document.visibilityState === "visible") prime();
    };
    const onInteract = () => prime();

    a.addEventListener("timeupdate", onA);
    b.addEventListener("timeupdate", onB);
    a.addEventListener("canplay", prime);
    b.addEventListener("canplay", prime);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("touchstart", onInteract, { passive: true, once: true });
    window.addEventListener("click", onInteract, { once: true });
    window.addEventListener("pointerdown", onInteract, { once: true });
    prime();

    const keepAlive = window.setInterval(() => {
      const lead = frontRef.current === 0 ? a : b;
      if (lead.paused) void tryPlay(lead);
    }, 2500);

    return () => {
      window.clearInterval(keepAlive);
      a.removeEventListener("timeupdate", onA);
      b.removeEventListener("timeupdate", onB);
      a.removeEventListener("canplay", prime);
      b.removeEventListener("canplay", prime);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("pointerdown", onInteract);
    };
  }, [src]);

  const videoClass = `hs-hero__video absolute inset-0 h-full w-full object-cover transition-opacity duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`;

  return (
    <div className="hs-hero__media-inner relative h-full w-full overflow-hidden bg-[#1a0f12]">
      <video
        ref={v0}
        className={`${videoClass} ${front === 0 ? "opacity-100" : "opacity-0"}`}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      <video
        ref={v1}
        className={`${videoClass} ${front === 1 ? "opacity-100" : "opacity-0"}`}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Covers residual native media chrome visually */}
      <div className="hs-hero__media-mask pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
    </div>
  );
}
