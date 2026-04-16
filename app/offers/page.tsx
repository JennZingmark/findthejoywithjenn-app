"use client";

import { useState } from "react";

export default function OffersPage() {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText("joy50%");
    } catch {
      const el = document.createElement("textarea");
      el.value = "joy50%";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Work With Jenn</h1>
      <p className="mt-1 text-sm text-gray-600">
        Explore your next best step. Faith Filled Divorce is featured right now.
      </p>

      {/* Faith Filled Divorce */}
      <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-6 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Featured Right Now
        </p>

        <h2 className="mt-2 text-lg font-semibold">Faith Filled Divorce</h2>

        <p className="mt-2 text-gray-700">
          Ongoing support, weekly coaching, and a step by step path to help you
          heal, grow, and move forward.
        </p>

        <div className="mt-4 flex gap-3">
          <a
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
            href="https://www.findthejoywithjenn.com/program-details"
            target="_blank"
            rel="noreferrer"
          >
            Learn More
          </a>

          <a
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
            href="https://www.findthejoywithjenn.com/membership-pricing"
            target="_blank"
            rel="noreferrer"
          >
            Join Now
          </a>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* 1:1 Coaching */}
        <div className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Coaching
          </p>

          <p className="mt-1 font-semibold">1:1 Coaching</p>

          <p className="mt-2 text-sm text-gray-700">
            Personal support and a clear path forward, tailored to your season.
          </p>

          <div className="mt-3 flex gap-3">
            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href="https://www.findthejoywithjenn.com/one-on-one-coaching"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href="https://calendly.com/jennzingmark/50min"
              target="_blank"
              rel="noreferrer"
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Courses */}
        <div className="relative rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm">

          {/* 🔥 Promo Badge */}
          <button
            onClick={copyCode}
            className="absolute -top-2 right-3 rounded-md bg-[#ab882e] px-2 py-[2px] text-[10px] font-bold text-white cursor-pointer hover:opacity-90"
          >
            {copied ? "Copied!" : "Promo Code Joy50%"}
          </button>

          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Course
          </p>

          <p className="mt-1 font-semibold">Courses</p>

          <p className="mt-2 text-sm text-gray-700">
            Self paced support to help you heal, grow, and move forward.
          </p>

          <div className="mt-3 flex gap-3">
            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href="https://www.findthejoywithjenn.com/courses"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href="https://www.findthejoywithjenn.com/courses"
              target="_blank"
              rel="noreferrer"
            >
              Use 50% Off
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}