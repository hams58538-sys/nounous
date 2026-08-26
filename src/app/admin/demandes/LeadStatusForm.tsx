"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LABELS: Record<string, string> = {
  NOUVELLE: "Nouvelle",
  EN_COURS: "En cours",
  PLACEE: "Placée",
  FERMEE: "Fermée",
};

const COLORS: Record<string, string> = {
  NOUVELLE: "bg-blue-100 text-blue-800",
  EN_COURS: "bg-yellow-100 text-yellow-800",
  PLACEE: "bg-green-100 text-green-800",
  FERMEE: "bg-gray-200 text-gray-700",
};

export default function LeadStatusForm({
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
    await fetch(`/api/admin/demandes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setStatus(newStatus);
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${COLORS[status]}`}>
        {LABELS[status]}
      </span>
      <select
        disabled={saving}
        value={status}
        onChange={(e) => updateStatus(e.target.value)}
        className="rounded-lg border border-eden-ink/20 px-2 py-1 text-sm"
        aria-label="Changer le statut de la demande"
      >
        <option value="NOUVELLE">Nouvelle</option>
        <option value="EN_COURS">En cours</option>
        <option value="PLACEE">Placée</option>
        <option value="FERMEE">Fermée</option>
      </select>
    </div>
  );
}
