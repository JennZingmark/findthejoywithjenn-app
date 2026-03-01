import { getSupabaseClient } from "@/lib/supabaseClient";

const DEFAULT_BOOK = process.env.NEXT_PUBLIC_DEFAULT_BOOK_URL!;

// Helper: decide if this offer should show a second button
function shouldShowSecondButton(category?: string | null) {
  // Only Courses should NOT have a second button
  return (category ?? "").toLowerCase() !== "courses";
}

// Helper: second button label (keeps your existing behavior)
function secondButtonLabel(category?: string | null) {
  // If it's the Strategy Session card or a coaching card, "Book Now" is fine
  // Otherwise keep "Book a Call" (you can tweak later)
  const c = (category ?? "").toLowerCase();
  if (c.includes("strategy")) return "Book Now";
  if (c.includes("1:1") || c.includes("coaching")) return "Book a Call";
  return "Book a Call";
}

// Helper: second button URL rules you requested
function secondButtonUrl(offer: any) {
  const category = (offer.category ?? "").toLowerCase();

  // 1:1 coaching should always book to the 50-min link
  if (category === "1:1 coaching" || category.includes("one-on-one")) {
    return "https://calendly.com/jennzingmark/50min";
  }

  // Otherwise use the offer’s book_url if present, fallback to DEFAULT_BOOK
  return offer.book_url || DEFAULT_BOOK;
}

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

export default async function OffersPage() {
  const offers = await getOffers();
  const featured = offers.find((o: any) => o.is_featured) ?? null;
  const list = offers.filter((o: any) => !o.is_featured);

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Work With Jenn</h1>
      <p className="mt-1 text-sm text-gray-600">
        Explore your next best step. Strategy Session is always available.
      </p>

      {/* FEATURED OFFER (Strategy Session) */}
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
            {/* Learn More */}
            <a
              className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href={featured.learn_more_url}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

            {/* Featured should KEEP second button (Book Now) */}
            <a
              className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href={DEFAULT_BOOK}
              target="_blank"
              rel="noreferrer"
            >
              Book Now
            </a>
          </div>
        </div>
      )}

      {/* OTHER OFFERS */}
      <div className="mt-6 space-y-4">
        {list.map((o: any, idx: number) => (
          <div
            key={idx}
            className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {o.category}
            </p>

            <p className="mt-1 font-semibold">{o.title}</p>

            {o.outcome && (
              <p className="mt-2 text-sm text-gray-700">{o.outcome}</p>
            )}

            <div className="mt-3 flex gap-3">
              {/* Learn More */}
              <a
                className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                href={o.learn_more_url}
                target="_blank"
                rel="noreferrer"
              >
                Learn More
              </a>

              {/* Second button for ALL except Courses */}
              {shouldShowSecondButton(o.category) && (
                <a
                  className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                  href={secondButtonUrl(o)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {secondButtonLabel(o.category)}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}