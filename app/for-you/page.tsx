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
    await navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
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
            className="rounded-2xl border-2 border-[#ab882e] bg-white p-4 shadow-sm"
          >
            <h2 className="text-base font-semibold">{offer.title}</h2>

            <p className="mt-1 text-sm text-zinc-600">{offer.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-lg border-2 border-[#ab882e] px-3 py-1 text-sm font-mono text-[#ab882e]">
                {offer.code}
              </span>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => copyCode(offer.code)}
                className="flex-1 rounded-xl bg-[#ab882e] px-4 py-2 text-sm font-semibold text-white"
              >
                {copied === offer.code ? "Copied!" : "Copy Code"}
              </button>

              <button
                onClick={() => open(offer.link)}
                className="flex-1 rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-semibold text-[#ab882e]"
              >
                Claim Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-4">
        <h3 className="font-semibold text-[#ab882e]">Learn More</h3>

        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={() =>
              open("https://www.findthejoywithjenn.com/program-details")
            }
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-semibold text-[#ab882e]"
          >
            Faith Filled Divorce Details
          </button>

          <button
            onClick={() =>
              open("https://www.findthejoywithjenn.com/one-on-one-coaching")
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