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
  el.setAttribute("playsinline", "");
  el.setAttribute("webkit-playsinline", "");
}

function tryPlay(el: HTMLVideoElement) {
  return el.play().catch(() => undefined);
}

/** Seamless crossfade loop — avoids a visible jump when native `loop` restarts. */
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
      void tryPlay(frontRef.current === 0 ? a : b);
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
          lead.pause();
          swapping.current = false;
        }, 750);
      });
    };

    const onA = () => maybeSwap(a, b, 1);
    const onB = () => maybeSwap(b, a, 0);
    const onVis = () => {
      if (document.visibilityState === "visible") prime();
    };

    a.addEventListener("timeupdate", onA);
    b.addEventListener("timeupdate", onB);
    a.addEventListener("canplay", prime);
    document.addEventListener("visibilitychange", onVis);
    prime();

    return () => {
      a.removeEventListener("timeupdate", onA);
      b.removeEventListener("timeupdate", onB);
      a.removeEventListener("canplay", prime);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [src]);

  const videoClass = `hs-hero__video absolute inset-0 h-full w-full object-cover transition-opacity duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`;

  return (
    <div className="hs-hero__media-inner relative h-full w-full overflow-hidden">
      <video
        ref={v0}
        className={`${videoClass} ${front === 0 ? "opacity-100" : "opacity-0"}`}
        style={{ objectPosition: "center bottom" }}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />
      <video
        ref={v1}
        className={`${videoClass} ${front === 1 ? "opacity-100" : "opacity-0"}`}
        style={{ objectPosition: "center bottom" }}
        src={src}
        muted
        playsInline
        loop
        preload="auto"
      />
    </div>
  );
}
