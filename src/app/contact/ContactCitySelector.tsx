"use client";

import { useState } from "react";

export default function ContactCitySelector() {
  const [href, setHref] = useState<string | null>(null);
  const [branch, setBranch] = useState<"DOUALA" | "YAOUNDE" | null>(null);

  async function choose(city: "DOUALA" | "YAOUNDE") {
    setBranch(city);
    const message = `Bonjour, je vous contacte depuis le site (${city === "DOUALA" ? "Douala" : "Yaoundé"}).`;
    const res = await fetch(`/api/whatsapp?branch=${city}&message=${encodeURIComponent(message)}`);
    const data = await res.json();
    setHref(data.href);
  }

  if (branch && href) {
    return (
      <div className="rounded-2xl border border-eden-gold/40 bg-white p-8">
        <p className="font-semibold text-eden-green">
          {branch === "DOUALA" ? "Douala" : "Yaoundé"}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream"
        >
          Discuter sur WhatsApp
        </a>
        <button
          onClick={() => setBranch(null)}
          className="mt-3 block w-full text-sm text-eden-ink/60 underline"
        >
          Changer de ville
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <button
        onClick={() => choose("DOUALA")}
        className="flex-1 rounded-2xl border-2 border-eden-blue bg-white px-6 py-4 font-display text-lg font-semibold text-eden-blue transition hover:bg-eden-blue hover:text-white"
      >
        📍 Douala
      </button>
      <button
        onClick={() => choose("YAOUNDE")}
        className="flex-1 rounded-2xl border-2 border-eden-green bg-white px-6 py-4 font-display text-lg font-semibold text-eden-green transition hover:bg-eden-green hover:text-white"
      >
        📍 Yaoundé
      </button>
    </div>
  );
}
