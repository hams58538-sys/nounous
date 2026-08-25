"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RequestForm() {
  const params = useSearchParams();
  const initialCity = params.get("ville") === "YAOUNDE" ? "YAOUNDE" : "DOUALA";

  const [city, setCity] = useState<"DOUALA" | "YAOUNDE">(initialCity);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);

    if (fd.get("website")) {
      setSubmitting(false);
      setDone(true); // honeypot — pretend success
      return;
    }

    const payload = {
      fullName: fd.get("fullName"),
      phone: fd.get("phone"),
      city,
      roleType: fd.get("roleType"),
      liveInOut: fd.get("liveInOut"),
      message: fd.get("message"),
      website: fd.get("website"),
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSubmitting(false);
    if (!res.ok) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mt-8 rounded-2xl border border-eden-gold/40 bg-white p-8 text-center">
        <p className="font-display text-xl font-semibold text-eden-green">
          Demande envoyée !
        </p>
        <p className="mt-2 text-eden-ink/70">
          Merci. Notre équipe vous recontacte très prochainement au numéro fourni.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label className="text-sm font-medium">Nom complet *</label>
        <input name="fullName" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>
      <div>
        <label className="text-sm font-medium">Téléphone *</label>
        <input name="phone" required placeholder="6XXXXXXXX" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>
      <div>
        <label className="text-sm font-medium">Ville *</label>
        <select value={city} onChange={(e) => setCity(e.target.value as "DOUALA" | "YAOUNDE")} className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
          <option value="DOUALA">Douala</option>
          <option value="YAOUNDE">Yaoundé</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Vous cherchez *</label>
        <select name="roleType" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
          <option value="NOUNOU">Une nounou</option>
          <option value="MENAGERE">Une ménagère</option>
          <option value="LES_DEUX">Les deux</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Logée ou non *</label>
        <select name="liveInOut" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
          <option value="live-in">Logée</option>
          <option value="live-out">Non logée</option>
          <option value="both">Peu importe</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Message (facultatif)</label>
        <textarea name="message" rows={4} className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream disabled:opacity-60"
      >
        {submitting ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
