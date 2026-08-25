import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-eden-ink/80">
      <h1 className="font-display text-3xl font-semibold text-eden-green">
        Politique de confidentialité
      </h1>

      <h2 className="mt-8 font-display text-xl font-semibold text-eden-green">
        Données que nous collectons
      </h2>
      <p className="mt-2">
        Pour les familles : nom, téléphone, ville, besoin exprimé. Pour les
        candidates : nom, date de naissance, téléphone, ville, expérience,
        références, photo, et copie de la carte nationale d&apos;identité
        (CNI) aux fins de vérification.
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold text-eden-green">
        Comment nous les protégeons
      </h2>
      <p className="mt-2">
        Les documents d&apos;identité sont stockés sur un espace privé et
        sécurisé, jamais publiés ni transmis par WhatsApp. Seul le personnel
        autorisé d&apos;Eden Agency peut y accéder, via des liens temporaires.
        Toutes les connexions au site sont chiffrées (HTTPS).
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold text-eden-green">
        Vos droits
      </h2>
      <p className="mt-2">
        Vous pouvez demander à tout moment la consultation, la correction ou
        la suppression de vos données en nous contactant directement.
      </p>
    </div>
  );
}
