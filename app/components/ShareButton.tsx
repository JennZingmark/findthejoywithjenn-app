"use client";

import { useMemo, useState } from "react";

export default function ShareButton({
  text,
  reference,
}: {
  text: string;
  reference?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const core = `${text}${reference ? ` — ${reference}` : ""}`;
    return `${core}\n\nFind the Joy with Jenn`;
  }, [text, reference]);

  const shareUrl = useMemo(() => {
    if (typeof window !== "undefined") return window.location.href;
    return "https://www.findthejoywithjenn.com/";
  }, []);

  async function onShareClick() {
    // On mobile (or browsers that support it), use native share sheet
    try {
      if (navigator.share) {
        await navigator.share({ text: message, url: shareUrl });
        return;
      }
    } catch {
      // user cancelled share: no big deal
      return;
    }

    // Desktop fallback: show our mini menu
    setOpen((v) => !v);
  }

  function openPopup(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareFacebook() {
    // Facebook shares best as a URL. (Localhost isn't ideal until deployed.)
    openPopup(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    );
    setOpen(false);
  }

  async function shareInstagram() {
    // Instagram doesn't support a true web share intent with text.
    // Best UX: copy message + link, then user pastes into IG.
    try {
      await navigator.clipboard.writeText(`${message}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={onShareClick}
        type="button"
        className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
      >
        {copied ? "Copied for Instagram!" : "Share"}
      </button>

      {open && (
        <div className="absolute left-1/2 z-20 mt-3 w-56 -translate-x-1/2 rounded-2xl border-2 border-[#ab882e] bg-white p-2 shadow-lg">
          <button
            onClick={shareFacebook}
            className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium hover:bg-[#e0c56e]/15 transition-colors"
            type="button"
          >
            Share to Facebook
          </button>

          <button
            onClick={shareInstagram}
            className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium hover:bg-[#e0c56e]/15 transition-colors"
            type="button"
          >
            Share to Instagram (copy)
          </button>

          <button
            onClick={() => setOpen(false)}
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-black/70 hover:bg-black/5 transition-colors"
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}