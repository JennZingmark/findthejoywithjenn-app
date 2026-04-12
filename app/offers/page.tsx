import { getSupabaseClient } from "@/lib/supabaseClient";

const DEFAULT_BOOK = process.env.NEXT_PUBLIC_DEFAULT_BOOK_URL!;

const FFD_URL = "https://www.findthejoywithjenn.com/program-details";
const ONE_ON_ONE_OLD_URL =
  "https://www.findthejoywithjenn.com/certified/one-on-one-coaching";
const ONE_ON_ONE_NEW_URL =
  "https://www.findthejoywithjenn.com/one-on-one-coaching";
const ONE_ON_ONE_BOOK = "https://calendly.com/jennzingmark/50min";
const STRATEGY_SESSION_URL =
  "https://www.findthejoywithjenn.com/reclaim-your-joy-strategy-session";

async function getOffers() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("offers")
    .select(
      "title, category, outcome, learn_more_url, book_url, is_featured, feature_priority, created_at"
    )
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("feature_priority", { ascending: false })
    .order("created_at", { ascending: false });

  return data ?? [];
}

function isOneOnOneOffer(o: any) {
  const url = (o.learn_more_url ?? "").trim();
  return url === ONE_ON_ONE_OLD_URL || url === ONE_ON_ONE_NEW_URL;
}

function findOneOnOneOffer(offers: any[]) {
  return offers.find((o: any) => isOneOnOneOffer(o)) ?? null;
}

function findFaithFilledDivorceOffer(offers: any[]) {
  return (
    offers.find((o: any) => {
      const url = (o.learn_more_url ?? "").trim().toLowerCase();
      const title = (o.title ?? "").toLowerCase();
      return (
        url === FFD_URL.toLowerCase() ||
        title.includes("faith filled divorce") ||
        title.includes("faith-filled divorce")
      );
    }) ?? null
  );
}

function findStrategySessionOffer(offers: any[]) {
  return (
    offers.find((o: any) => {
      const url = (o.learn_more_url ?? "").trim().toLowerCase();
      const title = (o.title ?? "").toLowerCase();
      return (
        url === STRATEGY_SESSION_URL.toLowerCase() ||
        title.includes("reclaim your joy") ||
        title.includes("strategy session")
      );
    }) ?? null
  );
}

export default async function OffersPage() {
  const offers = await getOffers();

  const ffdOffer = findFaithFilledDivorceOffer(offers);
  const oneOnOneOffer = findOneOnOneOffer(offers);
  const strategyOffer = findStrategySessionOffer(offers);

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

        <h2 className="mt-2 text-lg font-semibold">
          {ffdOffer?.title || "Faith Filled Divorce"}
        </h2>

        <p className="mt-2 text-gray-700">
          {ffdOffer?.outcome ||
            "Ongoing support, weekly coaching, and a step by step path to help you heal, grow, and move forward."}
        </p>

        <div className="mt-4 flex gap-3">
          <a
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
            href={FFD_URL}
            target="_blank"
            rel="noreferrer"
          >
            Learn More
          </a>

          <a
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
            href={DEFAULT_BOOK}
            target="_blank"
            rel="noreferrer"
          >
            Book Now
          </a>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* 1:1 Coaching */}
        <div className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {oneOnOneOffer?.category || "Coaching"}
          </p>

          <p className="mt-1 font-semibold">
            {oneOnOneOffer?.title || "1:1 Coaching"}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            {oneOnOneOffer?.outcome ||
              "Personal support and a clear path forward, tailored to your season."}
          </p>

          <div className="mt-3 flex gap-3">
            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href={ONE_ON_ONE_NEW_URL}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href={ONE_ON_ONE_BOOK}
              target="_blank"
              rel="noreferrer"
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Reclaim Your Joy Strategy Session */}
        <div className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {strategyOffer?.category || "Strategy Session"}
          </p>

          <p className="mt-1 font-semibold">
            {strategyOffer?.title || "Reclaim Your Joy Strategy Session"}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            {strategyOffer?.outcome ||
              "A free session to help you get clarity and a next step plan."}
          </p>

          <div className="mt-3 flex gap-3">
            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href={STRATEGY_SESSION_URL}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href={DEFAULT_BOOK}
              target="_blank"
              rel="noreferrer"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}