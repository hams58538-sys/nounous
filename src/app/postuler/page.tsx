import type { Metadata } from "next";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Postuler comme nounou ou ménagère",
  description:
    "Vous êtes nounou ou ménagère à Douala ou Yaoundé ? Postulez auprès d'Eden Agency et rejoignez notre réseau de professionnelles vérifiées.",
  alternates: { canonical: "/postuler" },
};

export default function PostulerPage() {
  return (
    <section className="bg-cover bg-center" style={{ backgroundImage: 'url("/images/formbg.jpg")' }}>
      <div className="mx-auto max-w-2xl bg-eden-cream/70 px-5 py-12 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]">
        <h1 className="font-display text-3xl font-semibold text-eden-green">Postuler comme nounou ou ménagère</h1>
        <p className="mt-2 text-eden-ink/70">Remplissez le formulaire ci-dessous. Vos documents sont stockés de façon sécurisée et privée — ils ne sont jamais partagés par WhatsApp. Après l&apos;envoi, vous pourrez continuer la conversation sur WhatsApp.</p>
        <ApplyForm />
      </div>
    </section>
  );
}
