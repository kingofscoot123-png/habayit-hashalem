"use client";

import { useEffect, useState } from "react";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

export function BreakSwitch({
  mobile,
  desktop,
}: {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}) {
  const { desktop: isDesk } = useMotionPrefs();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <>
        <div className="lg:hidden">{mobile}</div>
        <div className="hidden lg:block">{desktop}</div>
      </>
    );
  }

  return isDesk ? <>{desktop}</> : <>{mobile}</>;
}
