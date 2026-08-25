import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CitySelector from "@/components/CitySelector";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 text-center sm:pt-24">
        <Image
          src="/logo-full.png"
          alt="Éden — agence spécialisée dans le placement des nounous et ménagères"
          width={1080}
          height={1080}
          priority
          className="mx-auto h-auto w-56 sm:w-64"
        />
        <p className="mt-6 font-body text-sm font-semibold uppercase tracking-widest text-eden-green">
          Confiance · Qualité · Sérénité
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-eden-green sm:text-6xl">
          Placement de{" "}
          <span className="text-eden-pink">Nounous</span> &{" "}
          <span className="text-eden-blue">Ménagères</span>
        </h1>
        <p className="mt-3 font-display text-2xl text-eden-ink sm:text-3xl">
          à Douala et Yaoundé
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-eden-ink/80">
          Des professionnelles de confiance pour votre maison et vos enfants.
          Personnel vérifié, sélectionné avec soin, suivi dans la durée.
        </p>

        <div className="mt-10">
          <p className="mb-4 text-sm font-medium text-eden-ink/70">
            Choisissez votre ville pour commencer :
          </p>
          <CitySelector />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/demande"
            className="rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream transition hover:bg-eden-green-light"
          >
            Faire une demande de placement
          </Link>
          <Link
            href="/postuler"
            className="rounded-full border-2 border-eden-green px-6 py-3 font-semibold text-eden-green transition hover:bg-eden-green hover:text-eden-cream"
          >
            Postuler comme nounou / ménagère
          </Link>
        </div>
      </section>

      <TrustBadges />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center font-display text-3xl font-semibold text-eden-green">
          Nos deux domaines de placement
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-eden-pink/30 bg-white p-8">
            <p className="font-display text-2xl font-semibold text-eden-pink">Nounous</p>
            <p className="mt-2 text-eden-ink/80">
              Douces, attentionnées et professionnelles pour le bien-être de vos enfants.
            </p>
          </div>
          <div className="rounded-2xl border border-eden-blue/30 bg-white p-8">
            <p className="font-display text-2xl font-semibold text-eden-blue">Ménagères</p>
            <p className="mt-2 text-eden-ink/80">
              Sérieuses, discrètes et efficaces pour un intérieur propre et agréable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
