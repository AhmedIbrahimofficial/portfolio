"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Remove hash from URL on load so page always starts at top
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
