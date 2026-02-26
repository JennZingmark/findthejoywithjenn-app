"use client";

import { useEffect, useState } from "react";

export default function HeartHint() {
  const [phase, setPhase] = useState<"show" | "fade" | "hide">("show");

  useEffect(() => {
    // stay fully visible for 3 seconds
    const t1 = setTimeout(() => setPhase("fade"), 3000);

    // then fade out for 600ms, then remove entirely
    const t2 = setTimeout(() => setPhase("hide"), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "hide") return null;

  return (
    <p
      className={`mt-3 text-xs text-black/50 transition-opacity duration-700 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      Tap the heart to save this.
    </p>
  );
}