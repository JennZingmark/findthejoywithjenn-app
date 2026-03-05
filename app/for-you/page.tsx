"use client";

import { useState } from "react";

type Offer = {
  title: string;
  description: string;
  code: string;
  link: string;
};

const OFFERS: Offer[] = [
  {
    title: "$200 off 10 Coaching Sessions",
    description: "Choose the 10-session option on the coaching page.",
    code: "JOY200",
    link: "https://www.findthejoywithjenn.com/certified/one-on-one-coaching",
  },
  {
    title: "$25 off 1 Coaching Session",
    description: "Choose the single session option.",
    code: "25OFF",
    link: "https://www.findthejoywithjenn.com/certified/one-on-one-coaching",
  },
  {
    title: "$160 off Faith Filled Divorce (Pay in Full)",
    description: "Available on the membership pricing page.",
    code: "JOY160",
    link: "https://www.findthejoywithjenn.com/membership-pricing",
  },
  {
    title: "$25 off Faith Filled Divorce (Monthly)",
    description: "Monthly option on membership pricing.",
    code: "JOY25",
    link: "https://www.findthejoywithjenn.com/membership-pricing",
  },
];

export default function ForYouPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    setCopied(code);
    setTimeout(() => setCopied(null), 1500);

    // analytics hook (for later)
    console.log("coupon_copied", code);
  };

  const open = (url: string, code: string) => {
    copyCode(code);
    window.open(url, "_blank", "noopener,noreferrer");

    // analytics hook (for later)
    console.log("coupon_claim_clicked", code);
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-24 pt-5">
      <h1 className="text-2xl font-semibold text-[#ab882e]">For You</h1>

      <p className="mt-1 text-sm text-zinc-600">
        Exclusive offers available only inside the app.
      </p>

      <div className="mt-4 space-y-4">
        {OFFERS.map((offer) => (
          <div
            key={offer.code}
            className="relative rounded-2xl border-2 border-[#ab882e] bg-white p-4 shadow-sm cursor-pointer"
            onClick={() => open(offer.link, offer.code)}
          >
            {/* App Exclusive Ribbon */}
            <div className="absolute -top-2 right-3 rounded-md bg-[#ab882e] px-2 py-[2px] text-[10px] font-bold text-white">
              APP EXCLUSIVE
            </div>

            <h2 className="text-base font-semibold">{offer.title}</h2>

            <p className="mt-1 text-sm text-zinc-600">{offer.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-lg border-2 border-[#ab882e] px-3 py-1 text-sm font-mono text-[#ab882e]">
                {copied === offer.code ? "Copied!" : offer.code}
              </span>

              <span className="text-xs font-semibold text-[#ab882e]">
                Tap to Claim →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-4">
        <h3 className="font-semibold text-[#ab882e]">Learn More</h3>

        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={() =>
              window.open(
                "https://www.findthejoywithjenn.com/program-details",
                "_blank"
              )
            }
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-semibold text-[#ab882e]"
          >
            Faith Filled Divorce Details
          </button>

          <button
            onClick={() =>
              window.open(
                "https://www.findthejoywithjenn.com/one-on-one-coaching",
                "_blank"
              )
            }
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-semibold text-[#ab882e]"
          >
            Coaching Details
          </button>
        </div>
      </div>
    </main>
  );
}