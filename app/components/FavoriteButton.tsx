"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  reference?: string | null;
};

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

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function FavoriteButton({ text, reference }: Props) {
  const [isSaved, setIsSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const favs = readFavs();
    const exists = favs.find((f) => f.text === text);
    setIsSaved(Boolean(exists));
  }, [text]);

  function toggleFavorite() {
    const favs = readFavs();
    const existing = favs.find((f) => f.text === text);

    if (existing) {
      const next = favs.filter((f) => f.id !== existing.id);
      writeFavs(next);
      setIsSaved(false);
      return;
    }

    const newFav: FavItem = {
      id: makeId(),
      text,
      reference: reference ?? null,
      savedAt: new Date().toISOString(),
    };

    const next = [...favs, newFav];
    writeFavs(next);
    setIsSaved(true);
    setShowFeedback(true);

    setTimeout(() => setShowFeedback(false), 1200);
  }

  return (
    <span className="inline-flex flex-col items-center align-middle">
      <button
        onClick={toggleFavorite}
        className="transition-transform hover:scale-110"
        type="button"
      >
        {isSaved ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ab882e"
            viewBox="0 0 24 24"
            stroke="#ab882e"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.255.99-4 2.437C11.755 4.74 10.24 3.75 8.5 3.75 6.015 3.75 4 5.765 4 8.25c0 7.125 8 11.25 8 11.25s8-4.125 8-11.25z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#ab882e"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.255.99-4 2.437C11.755 4.74 10.24 3.75 8.5 3.75 6.015 3.75 4 5.765 4 8.25c0 7.125 8 11.25 8 11.25s8-4.125 8-11.25z"
            />
          </svg>
        )}
      </button>

      {showFeedback && (
        <span className="mt-1 text-[11px] text-[#ab882e]">
          Saved
        </span>
      )}
    </span>
  );
}