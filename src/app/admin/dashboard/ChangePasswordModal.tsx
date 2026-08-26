"use client";

import { useState } from "react";

export default function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (newPassword.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    const response = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    const data = await response.json();
    setSubmitting(false);
    if (!response.ok) {
      setError(data.error ?? "Impossible de changer le mot de passe.");
      return;
    }
    setStatus("Mot de passe modifié.");
    event.currentTarget.reset();
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="mt-8 rounded-full border-2 border-eden-green px-5 py-2 font-semibold text-eden-green transition hover:bg-eden-green hover:text-eden-cream">
        Changer le mot de passe
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-eden-ink/60 px-5" role="dialog" aria-modal="true" aria-labelledby="change-password-title">
          <div className="w-full max-w-md rounded-2xl border border-eden-gold/40 bg-eden-cream p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h2 id="change-password-title" className="font-display text-2xl font-semibold text-eden-green">Changer le mot de passe</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="text-2xl leading-none text-eden-ink/60">×</button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div><label htmlFor="currentPassword" className="text-sm font-medium">Mot de passe actuel</label><input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" /></div>
              <div><label htmlFor="newPassword" className="text-sm font-medium">Nouveau mot de passe</label><input id="newPassword" name="newPassword" type="password" required minLength={8} autoComplete="new-password" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" /></div>
              <div><label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le nouveau mot de passe</label><input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" /></div>
              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
              {status && <p className="text-sm text-eden-green" role="status">{status}</p>}
              <button type="submit" disabled={submitting} className="w-full rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream disabled:opacity-60">{submitting ? "Enregistrement..." : "Enregistrer"}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}