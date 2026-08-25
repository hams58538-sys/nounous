"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CandidateStatusForm({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function updateStatus(newStatus: string) {
    setSaving(true);
    await fetch(`/api/admin/candidats/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setStatus(newStatus);
    setSaving(false);
    router.refresh();
  }

  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    VERIFIED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status]}`}>
        {status}
      </span>
      <select
        disabled={saving}
        value={status}
        onChange={(e) => updateStatus(e.target.value)}
        className="rounded-lg border border-eden-ink/20 px-2 py-1 text-sm"
        aria-label="Changer le statut"
      >
        <option value="PENDING">En attente</option>
        <option value="VERIFIED">Vérifiée</option>
        <option value="REJECTED">Rejetée</option>
      </select>
    </div>
  );
}
