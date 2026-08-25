import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "De la demande à la période d'essai : découvrez les 5 étapes du processus de placement d'Eden Agency à Douala et Yaoundé.",
  alternates: { canonical: "/comment-ca-marche" },
};

const steps = [
  { title: "Vous faites une demande", text: "Décrivez votre besoin en 2 minutes via le formulaire en ligne." },
  { title: "Vérification et sélection", text: "Nous vérifions l'identité et les références de chaque candidate avant de vous la proposer." },
  { title: "Période d'essai", text: "Rencontrez la candidate et démarrez une période d'essai avant tout engagement long terme." },
  { title: "Placement", text: "Une fois satisfait, le placement est confirmé." },
  { title: "Suivi", text: "Nous restons disponibles après le placement pour tout ajustement nécessaire." },
];

export default function CommentCaMarchePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-semibold text-eden-green">Comment ça marche</h1>
      <ol className="mt-10 space-y-6">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="seal-ring flex h-10 w-10 shrink-0 items-center justify-center font-display font-semibold text-eden-green">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-eden-green">{s.title}</p>
              <p className="text-eden-ink/80">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
