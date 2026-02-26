import { getSupabaseClient } from "@/lib/supabaseClient";

type LinkRow = {
  key: string;
  title: string;
  url: string;
  sort_order: number | null;
};

async function getLinks(): Promise<LinkRow[]> {
  const supabase = getSupabaseClient();

  // ✅ Fallback links (used during build or if env vars missing)
  const fallback: LinkRow[] = [
    {
      key: "website",
      title: "Visit Website",
      url: "https://www.findthejoywithjenn.com/",
      sort_order: 1,
    },
    {
      key: "podcast",
      title: "Listen to the Podcast",
      url: "https://www.findthejoywithjenn.com/joy-in-the-journey-podcast",
      sort_order: 2,
    },
    {
      key: "facebook",
      title: "Join the Facebook Community",
      url: "https://www.facebook.com/groups/findthejoywithjenn",
      sort_order: 3,
    },
    {
      key: "book",
      title: "Reclaim Your Joy Strategy Session",
      url: "https://calendly.com/jennzingmark/freesession",
      sort_order: 4,
    },
  ];

  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("links")
    .select("key, title, url, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;

  return data as LinkRow[];
}

export default async function ConnectPage() {
  const links = await getLinks();

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Connect</h1>
      <p className="mt-1 text-sm text-black/70">
        Stay close to the community and the content.
      </p>

      <div className="mt-6 space-y-4">
        {links.map((l) => (
          <div
            key={l.key}
            className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{l.title}</p>
                <p className="mt-1 text-xs text-black/60 break-all">{l.url}</p>
              </div>

              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}