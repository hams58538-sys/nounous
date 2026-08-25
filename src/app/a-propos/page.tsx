import type { Metadata } from "next";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Eden Agency est une agence spécialisée dans le placement de nounous et ménagères de confiance à Douala et Yaoundé, Cameroun.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-4xl font-semibold text-eden-green">À propos d&apos;Eden Agency</h1>
        <p className="mt-6 text-eden-ink/80">
          Eden Agency accompagne les familles de Douala et Yaoundé dans la
          recherche de nounous et ménagères de confiance. Notre mission :
          offrir de la sérénité au quotidien, en mettant en relation des
          familles et des professionnelles sérieuses, vérifiées et bien
          accompagnées.
        </p>
        <h2 className="mt-10 font-display text-2xl font-semibold text-eden-green">
          Nos engagements
        </h2>
      </div>
      <TrustBadges />
    </div>
  );
}
