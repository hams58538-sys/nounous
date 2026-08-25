"use client";

import { useState } from "react";

export default function SettingsForm({
  initialDouala,
  initialYaounde,
}: {
  initialDouala: string;
  initialYaounde: string;
}) {
  const [douala, setDouala] = useState(initialDouala);
  const [yaounde, setYaounde] = useState(initialYaounde);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Enregistrement...");
    const res = await fetch("/api/admin/parametres", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp_douala: douala, whatsapp_yaounde: yaounde }),
    });
    setStatus(res.ok ? "Enregistré." : "Erreur lors de l'enregistrement.");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div>
        <label className="text-sm font-medium">Numéro WhatsApp — Douala</label>
        <input
          value={douala}
          onChange={(e) => setDouala(e.target.value)}
          placeholder="+237670638233"
          className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Numéro WhatsApp — Yaoundé</label>
        <input
          value={yaounde}
          onChange={(e) => setYaounde(e.target.value)}
          placeholder="+237657990371"
          className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream"
      >
        Enregistrer
      </button>
      {status && <p className="text-sm text-eden-ink/70">{status}</p>}
    </form>
  );
}
