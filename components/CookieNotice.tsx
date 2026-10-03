"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { content } from "@/content";

const KEY = "habayit-cookie-ok";

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(window.localStorage.getItem(KEY) !== "1");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-cookie-bar", open);
    return () => document.body.classList.remove("has-cookie-bar");
  }, [open]);

  if (!open) return null;

  return (
    <div className="cookie-bar" role="dialog" aria-label={content.legal.cookies}>
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          {content.legal.cookieBanner}{" "}
          <Link href="/cookies/" className="text-accent underline underline-offset-4">
            {content.legal.cookies}
          </Link>
        </p>
        <button
          type="button"
          className="btn-gold shrink-0 rounded-button px-5 py-2.5 text-sm font-bold"
          onClick={() => {
            window.localStorage.setItem(KEY, "1");
            setOpen(false);
          }}
        >
          {content.legal.acceptCookies}
        </button>
      </div>
    </div>
  );
}
