import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-eden-ink/80">
      <h1 className="font-display text-3xl font-semibold text-eden-green">Mentions légales</h1>
      <p className="mt-6">
        Eden Agency — Agence de placement de nounous et ménagères, opérant à
        Douala et Yaoundé, Cameroun.
      </p>
      <p className="mt-4">Téléphone (Douala) : +237 670 638 233</p>
      <p>Téléphone (Yaoundé) : +237 657 990 371</p>
      <p className="mt-4 text-sm text-eden-ink/60">
        [Remplacer par la raison sociale complète, le numéro de registre de
        commerce et l&apos;adresse du siège une fois disponibles.]
      </p>
    </div>
  );
}
