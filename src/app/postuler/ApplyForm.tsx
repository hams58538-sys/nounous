"use client";

import { useState } from "react";

type UploadKeys = {
  cniFrontKey?: string;
  cniBackKey?: string;
  photoKey?: string;
  cvKey?: string;
};

async function uploadFile(file: File, purpose: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("purpose", purpose);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Échec du téléversement");
  return data.key;
}

export default function ApplyForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappHref, setWhatsappHref] = useState<string | null>(null);
  const [city, setCity] = useState<"DOUALA" | "YAOUNDE">("DOUALA");
  const [roleType, setRoleType] = useState("NOUNOU");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      // Honeypot — must remain empty
      if (fd.get("website")) throw new Error("Soumission invalide");

      const files: UploadKeys = {};
      const cniFront = fd.get("cniFront") as File;
      const cniBack = fd.get("cniBack") as File;
      const photo = fd.get("photo") as File;
      const cv = fd.get("cv") as File | null;

      if (!cniFront?.size || !cniBack?.size || !photo?.size) {
        throw new Error("La CNI (recto/verso) et une photo sont obligatoires.");
      }

      files.cniFrontKey = await uploadFile(cniFront, "cni-front");
      files.cniBackKey = await uploadFile(cniBack, "cni-back");
      files.photoKey = await uploadFile(photo, "photo");
      if (cv?.size) files.cvKey = await uploadFile(cv, "cv");

      const payload = {
        fullName: fd.get("fullName"),
        dateOfBirth: fd.get("dateOfBirth"),
        phone: fd.get("phone"),
        city,
        quartier: fd.get("quartier"),
        roleType,
        yearsExperience: fd.get("yearsExperience"),
        availability: fd.get("availability"),
        schedule: fd.get("schedule"),
        experienceNotes: fd.get("experienceNotes"),
        reference1Name: fd.get("reference1Name"),
        reference1Phone: fd.get("reference1Phone"),
        languages: fd.get("languages"),
        consentGiven: fd.get("consentGiven") === "on",
        website: fd.get("website"),
        ...files,
      };

      const res = await fetch("/api/candidats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur lors de l'envoi");

      // Text-only WhatsApp handoff — no ID document, no fee mentioned.
      const message = `Bonjour, je viens de soumettre ma candidature en tant que ${
        roleType === "NOUNOU" ? "nounou" : roleType === "MENAGERE" ? "ménagère" : "nounou/ménagère"
      } à ${city === "DOUALA" ? "Douala" : "Yaoundé"}. Mon nom : ${fd.get("fullName")}.`;

      const waRes = await fetch(
        `/api/whatsapp?branch=${city}&message=${encodeURIComponent(message)}`
      );
      const waData = await waRes.json();
      setWhatsappHref(waData.href);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  if (whatsappHref) {
    return (
      <div className="mt-8 rounded-2xl border border-eden-gold/40 bg-white/75 p-8 text-center shadow-lg backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]">
        <p className="font-display text-xl font-semibold text-eden-green">
          Candidature envoyée !
        </p>
        <p className="mt-2 text-eden-ink/70">
          Vos documents ont été enregistrés en toute sécurité. Continuez la
          conversation sur WhatsApp pour la suite du processus.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream"
        >
          Continuer sur WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-eden-gold/40 bg-eden-cream/75 p-6 shadow-lg backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] sm:p-8">
      {/* Honeypot field — hidden from real users via CSS, bots fill it */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label className="text-sm font-medium">Nom complet *</label>
        <input name="fullName" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Date de naissance *</label>
          <input type="date" name="dateOfBirth" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Téléphone *</label>
          <input name="phone" required placeholder="6XXXXXXXX" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Ville *</label>
          <select value={city} onChange={(e) => setCity(e.target.value as "DOUALA" | "YAOUNDE")} className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
            <option value="DOUALA">Douala</option>
            <option value="YAOUNDE">Yaoundé</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Quartier</label>
          <input name="quartier" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Type de poste *</label>
        <select value={roleType} onChange={(e) => setRoleType(e.target.value)} className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
          <option value="NOUNOU">Nounou</option>
          <option value="MENAGERE">Ménagère</option>
          <option value="LES_DEUX">Les deux</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Années d&apos;expérience *</label>
          <input type="number" name="yearsExperience" min={0} max={60} required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Disponibilité *</label>
          <select name="availability" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
            <option value="live-in">Logée</option>
            <option value="live-out">Non logée</option>
            <option value="both">Les deux</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Horaire *</label>
        <select name="schedule" required className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2">
          <option value="full-time">Temps plein</option>
          <option value="part-time">Temps partiel</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Expérience (lieux, tâches, durée)</label>
        <textarea name="experienceNotes" rows={3} className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Référence — Nom</label>
          <input name="reference1Name" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Référence — Téléphone</label>
          <input name="reference1Phone" placeholder="6XXXXXXXX" className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Langues parlées</label>
        <input name="languages" placeholder="Français, Anglais, Duala..." className="mt-1 w-full rounded-lg border border-eden-ink/20 px-3 py-2" />
      </div>

      <fieldset className="rounded-xl border border-eden-gold/40 p-4">
        <legend className="px-1 text-sm font-semibold text-eden-green">Documents (privés et sécurisés)</legend>
        <div className="mt-2 space-y-3">
          <div>
            <label className="text-sm font-medium">CNI — recto *</label>
            <input type="file" name="cniFront" accept="image/*" required className="mt-1 w-full text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">CNI — verso *</label>
            <input type="file" name="cniBack" accept="image/*" required className="mt-1 w-full text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Photo (visage) *</label>
            <input type="file" name="photo" accept="image/*" required className="mt-1 w-full text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">CV (optionnel)</label>
            <input type="file" name="cv" accept="image/*,application/pdf" className="mt-1 w-full text-sm" />
          </div>
        </div>
      </fieldset>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consentGiven" required className="mt-1" />
        J&apos;autorise Eden Agency à conserver mes données pour la mise en relation avec des familles. *
      </label>

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream disabled:opacity-60"
      >
        {submitting ? "Envoi en cours..." : "Envoyer ma candidature"}
      </button>
    </form>
  );
}
