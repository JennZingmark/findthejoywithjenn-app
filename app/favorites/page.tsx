"use client";

import { useEffect, useState } from "react";

type FavItem = {
  id: string;
  text: string;
  reference?: string | null;
  savedAt: string;
};

const STORAGE_KEY = "ftj_favorites_v1";

function readFavs(): FavItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavItem[]) : [];
  } catch {
    return [];
  }
}

function writeFavs(favs: FavItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export default function FavoritesPage() {
  const [favs, setFavs] = useState<FavItem[]>([]);

  useEffect(() => {
    setFavs(readFavs());
  }, []);

  function remove(id: string) {
    const next = favs.filter((f) => f.id !== id);
    writeFavs(next);
    setFavs(next);
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Favorites</h1>
      <p className="mt-1 text-sm text-black/70">
        Saved on this device.
      </p>

      {favs.length === 0 ? (
        <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-6 shadow-sm">
          <p className="font-semibold">No favorites yet.</p>
          <p className="mt-2 text-sm text-black/70">
            Go to Jenn Juice and tap “Favorite” on a message you want to keep.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {favs.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-black/90">{f.text}</p>
              {f.reference && (
                <p className="mt-2 text-xs text-black/60">— {f.reference}</p>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => remove(f.id)}
                  className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] hover:bg-[#ab882e] hover:text-white transition-colors"
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}