"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  reference?: string | null;
};

export default function FavoriteButton({ text, reference }: Props) {
  const [isSaved, setIsSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const key = "jenn-favorites";

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (!stored) return;

    const favorites = JSON.parse(stored);
    const exists = favorites.find((f: any) => f.text === text);
    setIsSaved(Boolean(exists));
  }, [text]);

  function toggleFavorite() {
    const stored = localStorage.getItem(key);
    const favorites = stored ? JSON.parse(stored) : [];

    const exists = favorites.find((f: any) => f.text === text);

    let updated;

    if (exists) {
      updated = favorites.filter((f: any) => f.text !== text);
      setIsSaved(false);
    } else {
      updated = [...favorites, { text, reference }];
      setIsSaved(true);
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
      }, 1200);
    }

    localStorage.setItem(key, JSON.stringify(updated));
  }

  return (
    <span className="inline-flex flex-col items-center">
      <button
        onClick={toggleFavorite}
        className="transition-transform hover:scale-110"
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
        <span className="mt-1 text-[11px] text-[#ab882e] animate-fade">
          Saved
        </span>
      )}
    </span>
  );
}