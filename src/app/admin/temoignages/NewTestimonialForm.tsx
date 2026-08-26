"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTestimonialForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/temoignages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorName: fd.get("authorName"),
        city: fd.get("city"),
        content: fd.get("content"),
        rating: fd.get("rating"),
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      setError("Une erreur est survenue.");
      return;
    }
    e.currentTarget.reset();
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-eden-green px-5 py-2 font-semibold text-eden-cream"
      >
        + Ajouter un témoignage
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-eden-gold/40 bg-white p-6 space-y-4"
    >
      <div>
        <label className="text-sm font-medium">Nom de la famille *</label>
        <input name="authorName" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Ville *</label>
          <select name="city" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
            <option value="DOUALA">Douala</option>
            <option value="YAOUNDE">Yaoundé</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Note (1-5)</label>
          <input type="number" name="rating" min={1} max={5} defaultValue={5} className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Témoignage *</label>
        <textarea name="content" required rows={4} className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-eden-green px-6 py-2.5 font-semibold text-eden-cream disabled:opacity-60"
        >
          {submitting ? "Enregistrement..." : "Ajouter (en attente)"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border-2 border-eden-ink/20 px-6 py-2.5 font-semibold text-eden-ink/70"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
