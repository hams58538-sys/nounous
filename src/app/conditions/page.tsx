import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  alternates: { canonical: "/conditions" },
};

export default function ConditionsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-eden-ink/80">
      <h1 className="font-display text-3xl font-semibold text-eden-green">
        Conditions d&apos;utilisation
      </h1>
      <p className="mt-6">
        En utilisant ce site et en soumettant une demande ou une candidature,
        vous confirmez que les informations fournies sont exactes. Eden
        Agency se réserve le droit de vérifier toute information avant de
        procéder à une mise en relation.
      </p>
      <p className="mt-4">
        Les frais éventuels liés à un placement sont discutés directement
        avec l&apos;équipe Eden Agency et ne sont ni collectés ni traités sur
        ce site.
      </p>
    </div>
  );
}
