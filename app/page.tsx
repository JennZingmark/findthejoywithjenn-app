export const dynamic = "force-dynamic";

import FavoriteButton from "@/app/components/FavoriteButton";
import HeartHint from "@/app/components/HeartHint";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { dayOfYearNY, getNYDateString } from "@/lib/date";

function weekOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
}

async function getMessage() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const today = getNYDateString();

  const { data: scheduled } = await supabase
    .from("messages")
    .select("text, reference")
    .eq("scheduled_date", today)
    .eq("is_active", true)
    .limit(1);

  if (scheduled && scheduled.length > 0) return scheduled[0];

  const { data: pool } = await supabase
    .from("messages")
    .select("text, reference")
    .eq("is_active", true)
    .is("scheduled_date", null)
    .order("created_at", { ascending: true });

  if (!pool || pool.length === 0) return null;

  const index = dayOfYearNY() % pool.length;
  return pool[index];
}

export default async function Home() {
  const message = await getMessage();

  const heroImages = [
    "hero1.png",
    "hero2.png",
    "hero3.png",
    "hero4.png",
    "hero5.png",
    "hero6.png",
    "hero7.png",
    "hero8.png",
    "hero9.png",
    "hero10.png",
    "hero11.png",
    "hero12.png",
  ];

  const heroIndex = weekOfYear() % heroImages.length;
  const heroSrc = `/${heroImages[heroIndex]}`;

  return (
    <div className="flex justify-center bg-zinc-50 px-6 pt-6 pb-24">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border-4 border-[#ab882e] bg-white shadow-xl">
        {/* Hero */}
        <div className="relative h-36 w-full">
          <img
            src={heroSrc}
            alt="Find the Joy with Jenn"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="p-6">
          <h1 className="mb-6 flex items-center justify-center gap-2 text-center text-xl font-semibold">
            <span>Get Your Daily Jenn Juice</span>
            <img src="/favicon.png" alt="Jenn" className="h-6 w-6" />
          </h1>

          {message ? (
            <div className="text-center">
              
              {/* ✨ QUOTE BLOCK */}
              <div className="mb-4 px-2">
                <p className="text-[20px] leading-8 text-center font-medium text-zinc-800">
                  {message.text}
                </p>
              </div>

              {/* ❤️ Favorite */}
              <div className="flex justify-center">
                <FavoriteButton
                  text={message.text}
                  reference={message.reference ?? ""}
                />
              </div>

              <div className="mt-2">
                <HeartHint />
              </div>

              <div className="mt-3 flex justify-end">
                <a
                  href="/favorites"
                  className="inline-flex rounded-lg border border-[#ab882e] px-2 py-1 text-[11px] font-semibold text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
                >
                  View favorites
                </a>
              </div>

            </div>
          ) : (
            <p className="text-center text-sm text-black/70">
              Your daily message will appear here once the app is connected.
            </p>
          )}

          <div className="mt-8 border-t border-black/10 pt-4">

            <div className="mt-4">
              <a
                href="https://www.findthejoywithjenn.com/ask-a-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-[#ab882e] px-4 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Ask Jenn
              </a>
            </div>

            <p className="mt-4 text-center text-sm text-zinc-600">
              See past coaching questions and answers
              <br />
              or submit your own.
            </p>

            <p className="mt-3 text-center text-sm font-semibold">
              Jenn’s Answers to Real Questions
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}