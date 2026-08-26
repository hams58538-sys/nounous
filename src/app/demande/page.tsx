import type { Metadata } from "next";
import { Suspense } from "react";
import RequestForm from "./RequestForm";

export const metadata: Metadata = {
  title: "Faire une demande de placement",
  description:
    "Décrivez votre besoin en famille et recevez rapidement des profils de nounous ou ménagères vérifiés à Douala ou Yaoundé.",
  alternates: { canonical: "/demande" },
};

export default function DemandePage() {
  return (
    <section className="bg-cover bg-center" style={{ backgroundImage: 'url("/images/formbg.jpg")' }}>
      <div className="mx-auto max-w-2xl bg-eden-cream/70 px-5 py-12 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]">
        <h1 className="font-display text-3xl font-semibold text-eden-green">Faire une demande de placement</h1>
        <p className="mt-2 text-eden-ink/70">Décrivez votre besoin et nous vous recontactons rapidement avec des profils vérifiés et adaptés.</p>
        <Suspense fallback={<div className="mt-8 text-sm text-eden-ink/50">Chargement du formulaire...</div>}>
          <RequestForm />
        </Suspense>
      </div>
    </section>
  );
}
