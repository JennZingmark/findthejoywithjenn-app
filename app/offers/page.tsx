import { getSupabaseClient } from "@/lib/supabaseClient";

const DEFAULT_BOOK = process.env.NEXT_PUBLIC_DEFAULT_BOOK_URL!;

// Hard rules based on the URLs (so it won't break if category names change)
const COURSES_URL = "https://www.findthejoywithjenn.com/courses";
const ONE_ON_ONE_URL = "https://www.findthejoywithjenn.com/certified/one-on-one-coaching";
const ONE_ON_ONE_BOOK = "https://calendly.com/jennzingmark/50min";

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

function isCoursesOffer(o: any) {
  return (o.learn_more_url ?? "").trim() === COURSES_URL;
}

function isOneOnOneOffer(o: any) {
  return (o.learn_more_url ?? "").trim() === ONE_ON_ONE_URL;
}

function secondButtonText(o: any) {
  // 2nd card should say "Book a Session"
  if (isOneOnOneOffer(o)) return "Book a Session";
  // default label elsewhere (you can change later if you want)
  return "Book Now";
}

function secondButtonHref(o: any) {
  // 2nd card should book to /50min
  if (isOneOnOneOffer(o)) return ONE_ON_ONE_BOOK;

  // else: offer-specific book link or default strategy session
  return o.book_url || DEFAULT_BOOK;
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

      {/* FEATURED (Strategy Session): always Learn More + Book Now (DEFAULT_BOOK) */}
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
            <a
              className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              href={featured.learn_more_url}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

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

      {/* LIST */}
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
              {/* Always: Learn More */}
              <a
                className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                href={o.learn_more_url}
                target="_blank"
                rel="noreferrer"
              >
                Learn More
              </a>

              {/* ONLY show 2nd button if NOT Courses */}
              {!isCoursesOffer(o) && (
                <a
                  className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                  href={secondButtonHref(o)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {secondButtonText(o)}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}