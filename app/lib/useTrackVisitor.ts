"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useTrackVisitor() {
  const pathname = usePathname();

  useEffect(() => {
    // Fire and forget — don't block anything
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname }),
    }).catch(() => {});
  }, [pathname]);
}
