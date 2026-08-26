"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestimonialActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggleStatus() {
    setSaving(true);
    const next = status === "PUBLISHED" ? "PENDING" : "PUBLISHED";
    await fetch(`/api/admin/temoignages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm("Supprimer définitivement ce témoignage ?")) return;
    setSaving(true);
    await fetch(`/api/admin/temoignages/${id}`, { method: "DELETE" });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {status === "PUBLISHED" ? "Publié" : "En attente"}
      </span>
      <button
        onClick={toggleStatus}
        disabled={saving}
        className="rounded-lg border border-eden-gold/40 px-3 py-1.5 text-xs font-medium text-eden-green disabled:opacity-50"
      >
        {status === "PUBLISHED" ? "Dépublier" : "Publier"}
      </button>
      <button
        onClick={remove}
        disabled={saving}
        className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 disabled:opacity-50"
      >
        Supprimer
      </button>
    </div>
  );
}
