"use client";

import { useEffect, useMemo, useState } from "react";

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

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

export default function ForYouPage() {
  const [copied, setCopied] = useState<string | null>(null);

  // Push UI state
  const [pushSupported, setPushSupported] = useState(false);
  const [pushStatus, setPushStatus] = useState<
    "unknown" | "enabled" | "denied" | "not-supported"
  >("unknown");
  const [pushBusy, setPushBusy] = useState(false);
  const [pushMsg, setPushMsg] = useState<string | null>(null);

  const vapidKey = useMemo(
    () => process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
    []
  );

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;

    setPushSupported(supported);

    if (!supported) {
      setPushStatus("not-supported");
      return;
    }

    if (Notification.permission === "denied") setPushStatus("denied");
  }, []);

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

    // analytics hook (later)
    console.log("coupon_copied", code);
  };

  const openOffer = (url: string, code: string) => {
    copyCode(code);
    window.open(url, "_blank", "noopener,noreferrer");
    console.log("coupon_claim_clicked", code);
  };

  const enablePush = async () => {
    setPushMsg(null);

    if (!pushSupported) {
      setPushStatus("not-supported");
      setPushMsg("Notifications aren’t supported on this device/browser.");
      return;
    }

    if (!vapidKey) {
      setPushMsg("Missing VAPID public key. Check Vercel env vars.");
      return;
    }

    setPushBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setPushStatus(permission === "denied" ? "denied" : "unknown");
        setPushMsg("Notifications weren’t enabled.");
        return;
      }

      // Wait for SW to be ready (production PWA)
      const reg = await navigator.serviceWorker.ready;

      // If already subscribed, reuse it
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey),
        });
      }

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: sub,
          userAgent: navigator.userAgent,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Subscribe failed");
      }

      setPushStatus("enabled");
      setPushMsg("✅ You’re subscribed! You’ll get Jenn Juice alerts.");
    } catch (e: any) {
      setPushMsg(`Error enabling notifications: ${e?.message || e}`);
    } finally {
      setPushBusy(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-24 pt-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#ab882e]">For You</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Exclusive offers available only inside the app.
          </p>
        </div>
      </div>

      {/* Push CTA */}
      <div className="mt-4 rounded-2xl border-2 border-[#ab882e] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-[#ab882e]">
              Jenn Juice Alerts
            </div>
            <div className="mt-1 text-xs text-zinc-600">
              Get app-exclusive reminders + specials.
            </div>
          </div>

          <button
            onClick={enablePush}
            disabled={pushBusy || pushStatus === "enabled" || pushStatus === "denied"}
            className="rounded-xl bg-[#ab882e] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {pushStatus === "enabled"
              ? "Enabled"
              : pushStatus === "denied"
              ? "Blocked"
              : pushBusy
              ? "Enabling…"
              : "Enable Alerts"}
          </button>
        </div>

        {pushMsg ? (
          <div className="mt-2 text-xs text-zinc-700">{pushMsg}</div>
        ) : null}

        {pushStatus === "denied" ? (
          <div className="mt-2 text-xs text-zinc-700">
            You blocked notifications. You can re-enable them in your phone/browser
            notification settings for this app/site.
          </div>
        ) : null}
      </div>

      {/* Offers */}
      <div className="mt-4 space-y-4">
        {OFFERS.map((offer) => (
          <div
            key={offer.code}
            className="relative cursor-pointer rounded-2xl border-2 border-[#ab882e] bg-white p-4 shadow-sm"
            onClick={() => openOffer(offer.link, offer.code)}
          >
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

      {/* Learn More */}
      <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-4">
        <h3 className="font-semibold text-[#ab882e]">Learn More</h3>

        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={() =>
              window.open("https://www.findthejoywithjenn.com/program-details", "_blank")
            }
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-semibold text-[#ab882e]"
          >
            Faith Filled Divorce Details
          </button>

          <button
            onClick={() =>
              window.open("https://www.findthejoywithjenn.com/one-on-one-coaching", "_blank")
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