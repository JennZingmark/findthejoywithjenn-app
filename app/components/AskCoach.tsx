"use client";

import { useState } from "react";

export default function AskCoach({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function submit() {
    setErrorMsg("");

    if (!question.trim()) {
      setStatus("error");
      setErrorMsg("Please type your question first.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/ask-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          fromEmail: fromEmail.trim(),
          question: question.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      setStatus("sent");
      setQuestion("");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (e: any) {
      setStatus("error");
      setErrorMsg("Couldn’t send right now. Please try again.");
    }
  }

  // ✅ Compact version (for the home screen)
  if (compact) {
    return (
      <div className="space-y-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question…"
          rows={3}
          className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-[#ab882e]"
        />

        {/* Name + Email side-by-side to keep size small */}
        <div className="grid grid-cols-2 gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="w-full rounded-xl border border-black/15 px-3 py-2 text-[12px] outline-none focus:border-[#ab882e]"
          />

          <input
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            placeholder="Email (if you'd like a reply)"
            className="w-full rounded-xl border border-black/15 px-3 py-2 text-[12px] outline-none focus:border-[#ab882e]"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">{errorMsg}</p>
        )}

        {status === "sent" && (
          <p className="text-sm text-[#ab882e] text-center font-semibold">
            Sent ❤️
          </p>
        )}

        <button
          onClick={submit}
          disabled={status === "sending"}
          className="w-full rounded-xl bg-[#ab882e] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit"}
        </button>
      </div>
    );
  }

  // Non-compact (kept for future use if you ever want a full page)
  return (
    <div className="space-y-3">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question…"
        rows={4}
        className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#ab882e]"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#ab882e]"
        />

        <input
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          placeholder="Email (for a reply)"
          className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-[#ab882e]"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      {status === "sent" && (
        <p className="text-sm text-[#ab882e] text-center font-semibold">
          Sent ❤️
        </p>
      )}

      <button
        onClick={submit}
        disabled={status === "sending"}
        className="w-full rounded-xl bg-[#ab882e] px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </div>
  );
}