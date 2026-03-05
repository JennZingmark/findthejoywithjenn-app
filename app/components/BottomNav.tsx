"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname();

  const itemClass = (active: boolean) =>
    `flex min-w-0 flex-col items-center justify-center text-center transition-colors ${
      active ? "text-[#ab882e]" : "text-black/80 hover:text-[#ab882e]"
    }`;

  const labelClass =
    "mt-1 text-[11px] font-semibold leading-none truncate w-full";

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        border-t bg-white shadow-inner
        pb-[calc(env(safe-area-inset-bottom)+12px)]
      "
    >
      <div className="mx-auto w-full max-w-md px-3 pt-3">
        <div className="grid grid-cols-5 items-center gap-2">
          <Link href="/" className={itemClass(pathname === "/")}>
            <span className="text-lg">🏠</span>
            <span className={labelClass}>Jenn Juice</span>
          </Link>

          <Link href="/offers" className={itemClass(pathname === "/offers")}>
            <span className="text-lg">💛</span>
            <span className={labelClass}>Find The Joy</span>
          </Link>

          <Link href="/connect" className={itemClass(pathname === "/connect")}>
            <span className="text-lg">🔗</span>
            <span className={labelClass}>Connect</span>
          </Link>

          <Link href="/for-you" className={itemClass(pathname === "/for-you")}>
            <span className="text-lg">👤</span>
            <span className={labelClass}>For You</span>
          </Link>

          <a
            href="https://calendly.com/jennzingmark/freesession"
            target="_blank"
            rel="noopener noreferrer"
            className={itemClass(false)}
          >
            <span className="text-lg">📅</span>
            <span className={labelClass}>Book</span>
          </a>
        </div>
      </div>
    </nav>
  );
}