"use client";

import Link from "next/link";

export default function CitySelector() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
      <Link
        href="/douala"
        className="flex-1 rounded-2xl border-2 border-eden-blue bg-white px-6 py-4 text-center font-display text-lg font-semibold text-eden-blue shadow-sm transition hover:bg-eden-blue hover:text-white"
      >
        📍 Douala
      </Link>
      <Link
        href="/yaounde"
        className="flex-1 rounded-2xl border-2 border-eden-green bg-white px-6 py-4 text-center font-display text-lg font-semibold text-eden-green shadow-sm transition hover:bg-eden-green hover:text-white"
      >
        📍 Yaoundé
      </Link>
    </div>
  );
}
