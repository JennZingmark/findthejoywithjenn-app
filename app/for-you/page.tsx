"use client";

import { useState } from "react";

type Offer = {
  title: string;
  description: string;
  code: string;
  link: string;
  finePrint?: string;
};

const GOLD = "#ab882e";

const OFFERS: Offer[] = [
  {
    title: "$200 off 10 Coaching Sessions",
    description: "One-on-one coaching (choose the 10-session option on the page).",
    code: "JOY200",
    link: "https://www.findthejoywithjenn.com/certified/one-on-one-coaching",
  },
  {
    title: "$25 off 1 Coaching Session",
    description: "One-on-one coaching (choose the 1-session option on the page).",
    code: "25OFF",
    link: "https://www.findthejoywithjenn.com/certified/one-on-one-coaching",
  },
  {
    title: "$160 off Faith Filled Divorce (Pay in Full)",
    description: "Membership pricing page (pay-in-full option).",
    code: "JOY160",
    link: "https://www.findthejoywithjenn.com/membership-pricing",
  },
  {
    title: "$25 off Faith Filled Divorce (Monthly)",
    description: "Membership pricing page (monthly option).",
    code: "JOY25",
    link: "https://www.findthejoywithjenn.com/membership-pricing",
  },
];

export default function ForYouPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copy = async (code: string) => {
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
    setCopiedCode(code);
    window.setTimeout(() => setCopiedCode(null), 1400);
  };

  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-24 pt-5">
      <div className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderColor: `${GOLD}55` }}>
        <h1 className="text-2xl font-semibold" style={{ color: GOLD }}>
          For You
        </h1>
        <p className="mt-1 text-sm text-zinc-700">
          Exclusive app-only offers. Tap <span className="font-semibold">Copy Code</span>, then{" "}
          <span className="font-semibold">Claim Offer</span>.
        </p>
      </div>

      <section className="mt-4 space-y-3">
        {OFFERS.map((o) => (
          <div
            key={o.code}
            className="rounded-2xl border bg-white p-4 shadow-sm"
            style={{ borderColor: `${GOLD}55` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold">{o.title}</div>
                <div className="mt-1 text-sm text-zinc-600">{o.description}</div>
              </div>

              <div
                className="shrink-0 rounded-xl px-3 py-2 text-sm font-mono"
                style={{
                  border: `1px solid ${GOLD}55`,
                  backgroundColor: `${GOLD}12`,
                  color: GOLD,
                }}
              >
                {o.code}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => void copy(o.code)}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm"
                style={{ backgroundColor: GOLD }}
              >
                {copiedCode === o.code ? "Copied!" : "Copy Code"}
              </button>

              <button
                onClick={() => open(o.link)}
                className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm"
                style={{
                  border: `1px solid ${GOLD}80`,
                  color: GOLD,
                  backgroundColor: "white",
                }}
              >
                Claim Offer
              </button>
            </div>

            {o.finePrint ? <div className="mt-2 text-xs text-zinc-500">{o.finePrint}</div> : null}
          </div>
        ))}
      </section>

      <section
        className="mt-5 rounded-2xl border bg-white p-4 shadow-sm"
        style={{ borderColor: `${GOLD}55` }}
      >
        <div className="text-sm font-semibold" style={{ color: GOLD }}>
          Want to learn more first?
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <button
            onClick={() => open("https://www.findthejoywithjenn.com/program-details")}
            className="rounded-xl px-4 py-3 text-sm font-semibold shadow-sm"
            style={{
              border: `1px solid ${GOLD}80`,
              color: GOLD,
              backgroundColor: "white",
            }}
          >
            Faith Filled Divorce Program Details
          </button>

          <button
            onClick={() => open("https://www.findthejoywithjenn.com/one-on-one-coaching")}
            className="rounded-xl px-4 py-3 text-sm font-semibold shadow-sm"
            style={{
              border: `1px solid ${GOLD}80`,
              color: GOLD,
              backgroundColor: "white",
            }}
          >
            Coaching Details
          </button>
        </div>
      </section>
    </main>
  );
}