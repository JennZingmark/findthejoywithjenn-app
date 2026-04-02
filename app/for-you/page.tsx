"use client";

import { useState } from "react";
import { MessageCircle, Heart, Play, Mail } from "lucide-react";

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
      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes float1 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float2 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(5px); }
          100% { transform: translateY(0px); }
        }
        .float1 {
          animation: float1 6s ease-in-out infinite;
        }
        .float2 {
          animation: float2 7s ease-in-out infinite;
        }
        .float3 {
          animation: float1 8s ease-in-out infinite;
        }
        .float4 {
          animation: float2 9s ease-in-out infinite;
        }
      `}</style>

      <div>
        <h1 className="text-2xl font-semibold text-[#ab882e]">App Exclusives</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Exclusive offers and free resources available inside the app.
        </p>
      </div>

      {/* EXCLUSIVE OFFERS */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#ab882e]">
          Exclusive Offers
        </h2>
      </div>

      <div className="relative mt-3 rounded-2xl border-2 border-[#ab882e] bg-white p-4 shadow-sm">
        <div className="absolute -top-2 right-3 rounded-md bg-[#ab882e] px-2 py-[2px] text-[10px] font-bold text-white">
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

      {/* FREE RESOURCES */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#ab882e]">
          Free Resources
        </h2>
      </div>

      <div className="relative mt-3 rounded-2xl border-2 border-[#ab882e] bg-white p-4 shadow-sm overflow-hidden">
        
        {/* Floating Social Icons */}
        <MessageCircle
          className="absolute right-4 top-3 text-[#ab882e]/70 float1"
          size={22}
        />
        <Heart
          className="absolute right-10 top-10 text-[#ab882e]/70 float2"
          size={18}
        />
        <Play
          className="absolute right-3 bottom-4 text-[#ab882e]/70 float3"
          size={18}
        />
        <Mail
          className="absolute right-14 bottom-3 text-[#ab882e]/70 float4"
          size={18}
        />

        <h2 className="text-base font-semibold">{RESOURCE.title}</h2>
        <p className="mt-1 text-sm text-zinc-600">{RESOURCE.description}</p>

        <div className="mt-3">
          <button
            onClick={() => openOffer(RESOURCE.link)}
            className="w-full rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-semibold text-[#ab882e]"
          >
            Get the Free PDF
          </button>
        </div>
      </div>
    </main>
  );
}