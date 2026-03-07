"use client";

import { useEffect, useMemo, useState } from "react";

type Offer = {
  title: string;
  description: string;
  code: string;
  link: string;
};

const OFFER: Offer = {
  title: "50% Off All Courses",
  description:
    "Exclusive app-only savings on every course. Copy your code, then head to the courses page.",
  code: "joy50%",
  link: "https://www.findthejoywithjenn.com/courses",
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

async function getWorkingServiceWorkerRegistration() {
  const existing = await navigator.serviceWorker.getRegistrations();

  let reg =
    existing.find((r) => r.active) ||
    existing.find((r) => r.waiting) ||
    existing.find((r) => r.installing);

  if (!reg) {
    reg = await navigator.serviceWorker.register("/sw.js");
  }

  const readyReg = await Promise.race([
    navigator.serviceWorker.ready,
    new Promise<never>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              "Service worker not ready yet. Please close and reopen the app, then try again."
            )
          ),
        8000
      )
    ),
  ]);

  return reg || readyReg;
}

export default function ForYouPage() {
  const [copied, setCopied] = useState<string | null>(null);
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
    const initPushState = async () => {
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

      if (Notification.permission === "denied") {
        setPushStatus("denied");
        return;
      }

      try {
        const reg = await navigator.serviceWorker.ready;
        const existingSub = await reg.pushManager.getSubscription();

        if (existingSub) {
          setPushStatus("enabled");
          setPushMsg("✅ Alerts are enabled.");
        } else {
          setPushStatus("unknown");
        }
      } catch {
        setPushStatus("unknown");
      }
    };

    void initPushState();
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
  };

  const openOffer = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const enablePush = async () => {
    setPushMsg(null);

    if (!pushSupported) {
      setPushStatus("not-supported");
      setPushMsg("Notifications aren’t supported on this device/browser.");
      return;
    }

    if (!vapidKey) {
      setPushMsg("Missing VAPID public key.");
      return;
    }

    setPushBusy(true);

    try {
      const permission =
        Notification.permission === "granted"
          ? "granted"
          : await Notification.requestPermission();

      if (permission !== "granted") {
        setPushStatus(permission === "denied" ? "denied" : "unknown");
        setPushMsg("Notifications were not enabled.");
        return;
      }

      const reg = await getWorkingServiceWorkerRegistration();

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
        const raw = await res.text();
        let message = raw || "Subscribe failed";

        try {
          const parsed = JSON.parse(raw);
          message = parsed?.error || raw;
        } catch {
          // keep raw text
        }

        throw new Error(message);
      }

      setPushStatus("enabled");
      setPushMsg("✅ Alerts are enabled.");
    } catch (e: any) {
      setPushStatus("unknown");
      setPushMsg(e?.message || "Something went wrong enabling alerts.");
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
              ? "Enabling..."
              : "Enable Alerts"}
          </button>
        </div>

        {pushMsg ? (
          <div className="mt-2 break-words text-xs text-zinc-700">{pushMsg}</div>
        ) : null}
      </div>

      <div className="relative mt-4 rounded-2xl border-2 border-[#ab882e] bg-white p-4 shadow-sm">
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