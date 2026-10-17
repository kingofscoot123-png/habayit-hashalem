"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoLoopProps = {
  src: string;
  className?: string;
};

/** Seamless crossfade loop — avoids visible jump when native `loop` restarts. */
export function HeroVideoLoop({ src, className = "" }: HeroVideoLoopProps) {
  const [front, setFront] = useState(0);
  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const swapping = useRef(false);

  useEffect(() => {
    const a = v0.current;
    const b = v1.current;
    if (!a || !b) return;

    const prime = async () => {
      a.muted = true;
      b.muted = true;
      a.currentTime = 0;
      b.currentTime = 0;
      await a.play().catch(() => undefined);
    };
    void prime();

    const maybeSwap = (lead: HTMLVideoElement, follow: HTMLVideoElement, nextFront: 0 | 1) => {
      if (!lead.duration || swapping.current) return;
      const left = lead.duration - lead.currentTime;
      if (left > 0.55 || left <= 0.05) return;

      swapping.current = true;
      follow.currentTime = 0;
      void follow.play().then(() => {
        setFront(nextFront);
        window.setTimeout(() => {
          lead.pause();
          swapping.current = false;
        }, 750);
      });
    };

    const onA = () => maybeSwap(a, b, 1);
    const onB = () => maybeSwap(b, a, 0);

    a.addEventListener("timeupdate", onA);
    b.addEventListener("timeupdate", onB);
    return () => {
      a.removeEventListener("timeupdate", onA);
      b.removeEventListener("timeupdate", onB);
    };
  }, [src]);

  const videoClass = `${className} absolute inset-0 h-full w-full object-cover transition-opacity duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)]`;

  return (
    <div className="hs-hero__media-inner relative h-full w-full overflow-hidden">
      <video
        ref={v0}
        className={`${videoClass} hs-hero__video ${front === 0 ? "opacity-100" : "opacity-0"}`}
        src={src}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={v1}
        className={`${videoClass} hs-hero__video ${front === 1 ? "opacity-100" : "opacity-0"}`}
        src={src}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
