"use client";

import { useRef } from "react";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Magnetic({ children, className = "", onMouseMove, onMouseLeave, ...props }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      {...props}
      ref={ref}
      data-owned="1"
      className={`magnetic ${className}`}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = el.getBoundingClientRect();
        const pull = window.matchMedia("(max-width: 1023px)").matches ? 0.1 : 0.22;
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate3d(${x * pull}px, ${y * pull}px, 0)`;
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </a>
  );
}
