import { getSupabaseClient } from "@/lib/supabaseClient";

const DEFAULT_BOOK =
  process.env.NEXT_PUBLIC_DEFAULT_BOOK_URL ||
  "https://calendly.com/jennzingmark/freesession";

type OfferRow = {
  title: string;
  category: string | null;
  outcome: string | null;
  learn_more_url: string | null;
  book_url: string | null;
  is_featured: boolean | null;
  feature_priority: number | null;
};

async function getOffers(): Promise<OfferRow[]> {
  const supabase = getSupabaseClient();

  // ✅ Fallback offers (won’t crash build)
  const fallback: OfferRow[] = [
    {
      title: "Reclaim Your Joy Strategy Session",
      category: "Start Here",
      outcome: "A free session to help you get clarity and a next-step plan.",
      learn_more_url: "https://www.findthejoywithjenn.com/certified/one-on-one-coaching",
      book_url: DEFAULT_BOOK,
      is_featured: true,
      feature_priority: 999
    },
    {
      title: "One-on-One Coaching",
      category: "Coaching",
      outcome: "Personal coaching support to help you heal, grow, and move forward with confidence.",
      learn_more_url: "https://www.findthejoywithjenn.com/certified/one-on-one-coaching",
      book_url: DEFAULT_BOOK,
      is_featured: false,
      feature_priority: 1
    },
    {
      title: "Courses",
      category: "Courses",
      outcome: "Self-paced resources to help you build a stronger, joy-filled next chapter.",
      learn_more_url: "https://www.findthejoywithjenn.com/courses",
      book_url: DEFAULT_BOOK,
      is_featured: false,
      feature_priority: 0
    }
  ];

  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("offers")
    .select(
      "title, category, outcome, learn_more_url, book_url, is_featured, feature_priority"
    )
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("feature_priority", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return fallback;

  return data as OfferRow[];
}

export default async function OffersPage() {
  const offers = await getOffers();
  const featured = offers.find((o) => o.is_featured) ?? null;
  const list = offers.filter((o) => !o.is_featured);

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Work With Jenn</h1>
      <p className="mt-1 text-sm text-gray-600">
        Explore your next best step. Strategy Session is always available.
      </p>

      {featured && (
        <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-6 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Featured Right Now
          </p>

          <h2 className="mt-2 text-lg font-semibold">{featured.title}</h2>

          {featured.outcome && (
            <p className="mt-2 text-gray-700">{featured.outcome}</p>
          )}

          <div className="mt-4 flex gap-3">
            {featured.learn_more_url && (
              <a
                className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                href={featured.learn_more_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            )}

            <a
              className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href={featured.book_url || DEFAULT_BOOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {list.map((o, idx) => (
          <div
            key={idx}
            className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm"
          >
            {o.category && (
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {o.category}
              </p>
            )}

            <p className={o.category ? "mt-1 font-semibold" : "font-semibold"}>
              {o.title}
            </p>

            {o.outcome && <p className="mt-2 text-sm text-gray-700">{o.outcome}</p>}

            <div className="mt-3 flex gap-3">
              {o.learn_more_url && (
                <a
                  className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                  href={o.learn_more_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              )}

              <a
                className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                href={o.book_url || DEFAULT_BOOK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}