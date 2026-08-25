import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Découvrez les deux domaines de placement d'Eden Agency : nounous pour vos enfants et ménagères pour votre intérieur, à Douala et Yaoundé.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-display text-4xl font-semibold text-eden-green">Nos services</h1>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-eden-pink/30 bg-white p-8">
          <p className="font-display text-2xl font-semibold text-eden-pink">Nounous</p>
          <p className="mt-3 text-eden-ink/80">
            Douces, attentionnées et professionnelles pour le bien-être de vos enfants.
            Chaque candidate passe par une vérification d&apos;identité, un contrôle de
            références et un entretien avant présentation aux familles.
          </p>
        </div>
        <div className="rounded-2xl border border-eden-blue/30 bg-white p-8">
          <p className="font-display text-2xl font-semibold text-eden-blue">Ménagères</p>
          <p className="mt-3 text-eden-ink/80">
            Sérieuses, discrètes et efficaces pour un intérieur propre et agréable.
            Sélection adaptée à la taille du foyer et aux tâches spécifiques demandées.
          </p>
        </div>
      </div>
    </div>
  );
}
