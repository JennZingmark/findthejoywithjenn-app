"use client";

import { useEffect, useState } from "react";

export default function HeartHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);

    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <p className="mt-2 text-[12px] text-black/60">
      Tap the heart to save this message
    </p>
  );
}