"use client";

import { useState } from "react";

type Offer = {
  title: string;
  description: string;
  code: string;
  link: string;
};

const OFFER: Offer = {
  title: "50% Off All Courses",
  description:
    "Exclusive app only savings on every course. Copy your code, then head to the courses page.",
  code: "joy50%",
  link: "https://www.findthejoywithjenn.com/courses",
};

const RESOURCE = {
  title: "Divorce Social Media Protocol",
  description:
    "Grab your free guide to help you navigate social media wisely during divorce.",
  link: "https://www.findthejoywithjenn.com/social-media-protocol-pdf",
};

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
  };

  const openOffer = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-24 pt-5">
      <div>
        <h1 className="text-2xl font-semibold text-[#ab882e]">App Exclusives</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Exclusive offers and free resources available inside the app.
        </p>
      </div>

      {/* FREE RESOURCES */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#ab882e]">
          Free Resources
        </h2>
      </div>

      <div className="relative mt-3 rounded-2xl border-2 border-[#ab882e] bg-white p-4 pt-5 shadow-sm overflow-hidden">
        <div className="absolute top-1 right-3 rounded-md bg-[#ab882e] px-2 py-[2px] text-[10px] font-bold text-white">
          APP EXCLUSIVE
        </div>

        {/* top/right icons */}
        <img
          src="/icons/instagram.png"
          alt="Instagram"
          className="absolute right-4 top-8 w-7 opacity-100"
        />

        <img
          src="/icons/facebook.png"
          alt="Facebook"
          className="absolute right-30 top-[76px] w-7 opacity-100"
        />

        <img
          src="/icons/community.png"
          alt="Community"
          className="absolute right-12 top-[78px] w-12 opacity-100"
        />

        <h2 className="pr-24 text-base font-semibold">{RESOURCE.title}</h2>
        <p className="mt-1 max-w-[265px] text-sm text-zinc-600">
          {RESOURCE.description}
        </p>

        {/* button area with icons ON TOP of button */}
        <div className="relative mt-4">
          <button
            onClick={() => openOffer(RESOURCE.link)}
            className="w-full rounded-xl bg-[#ab882e] px-4 py-2 text-sm font-semibold text-white"
          >
            Get the Free PDF
          </button>

          <img
            src="/icons/youtube.png"
            alt="YouTube"
            className="absolute bottom-1.5 right-14 w-7 opacity-100"
          />

          <img
            src="/icons/Click.png"
            alt="Click"
            className="absolute bottom-1 right-1 w-9 opacity-100"
          />
        </div>
      </div>

      {/* EXCLUSIVE OFFERS */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#ab882e]">
          Exclusive Offers
        </h2>
      </div>

      <div className="relative mt-3 rounded-2xl border-2 border-[#ab882e] bg-white p-4 pt-5 shadow-sm">
        <div className="absolute top-1 right-3 rounded-md bg-[#ab882e] px-2 py-[2px] text-[10px] font-bold text-white">
          APP EXCLUSIVE
        </div>

        <h2 className="text-base font-semibold">{OFFER.title}</h2>
        <p className="mt-1 text-sm text-zinc-600">{OFFER.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => copyCode(OFFER.code)}
            className="rounded-lg border-2 border-[#ab882e] px-3 py-1 text-sm font-mono text-[#ab882e]"
          >
            {copied === OFFER.code ? "Copied!" : OFFER.code}
          </button>

          <span className="text-xs font-semibold text-[#ab882e]">
            Tap code to copy
          </span>
        </div>

        <div className="mt-3">
          <button
            onClick={() => openOffer(OFFER.link)}
            className="w-full rounded-xl bg-[#ab882e] px-4 py-2 text-sm font-semibold text-white"
          >
            Claim Offer
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-4">
        <h3 className="font-semibold text-[#ab882e]">Browse Courses</h3>

        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={() => openOffer("https://www.findthejoywithjenn.com/courses")}
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-semibold text-[#ab882e]"
          >
            View All Courses
          </button>
        </div>
      </div>
    </main>
  );
}