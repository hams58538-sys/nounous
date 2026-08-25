"use client";

import { useState } from "react";

const FIELDS: { key: string; label: string }[] = [
  { key: "cniFrontKey", label: "CNI recto" },
  { key: "cniBackKey", label: "CNI verso" },
  { key: "photoKey", label: "Photo" },
];

export default function DocumentViewer({ candidateId, hasCv }: { candidateId: string; hasCv: boolean }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fields = hasCv ? [...FIELDS, { key: "cvKey", label: "CV" }] : FIELDS;

  async function viewDocument(field: string) {
    setLoading(field);
    setError(null);
    try {
      const res = await fetch(`/api/admin/document?candidateId=${candidateId}&field=${field}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la génération du lien");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {fields.map((f) => (
        <button
          key={f.key}
          onClick={() => viewDocument(f.key)}
          disabled={loading === f.key}
          className="rounded-lg border border-eden-gold/40 px-3 py-1.5 text-xs font-medium text-eden-green disabled:opacity-50"
        >
          {loading === f.key ? "Génération..." : `Voir ${f.label}`}
        </button>
      ))}
      {error && <p className="w-full text-xs text-red-600">{error}</p>}
    </div>
  );
}
