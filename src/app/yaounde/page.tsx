import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Nounou et Ménagère à Yaoundé",
  description:
    "Eden Agency place des nounous et ménagères de confiance à Yaoundé. Personnel vérifié et sélectionné avec soin.",
  alternates: { canonical: "/yaounde" },
};

export default function YaoundePage() {
  return (
    <section className="bg-cover bg-center" style={{ backgroundImage: 'url("/images/housebg-2.jpg")' }}>
      <div className="mx-auto max-w-4xl bg-eden-cream/70 px-5 py-16 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://edenagency.vercel.app/yaounde#business",
            name: "Eden Agency — Yaoundé",
            url: "https://edenagency.vercel.app/yaounde",
            image: "https://edenagency.vercel.app/logo-full.png",
            telephone: "+237657990371",
            areaServed: "Yaoundé, Cameroun",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Yaoundé",
              addressCountry: "CM",
            },
            description:
              "Agence de placement de nounous et ménagères à Yaoundé.",
            parentOrganization: { "@id": "https://edenagency.vercel.app/#organization" },
          }),
        }}
      />
      <p className="text-sm font-semibold uppercase tracking-widest text-eden-green">
        📍 Yaoundé
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-eden-green">
        Nounous & ménagères de confiance à Yaoundé
      </h1>
      <p className="mt-4 text-eden-ink/80">
        Nous vous proposons des nounous et ménagères fiables, expérimentées et
        soigneusement sélectionnées, disponibles dans tous les quartiers de Yaoundé.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/demande?ville=YAOUNDE"
          className="rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream transition hover:bg-eden-green-light"
        >
          Faire une demande à Yaoundé
        </Link>
        <WhatsAppButton
          branch="YAOUNDE"
          message="Bonjour, je souhaite des renseignements sur vos services à Yaoundé."
          label="Discuter sur WhatsApp"
          className="!bg-transparent !text-eden-green border-2 border-eden-green hover:!bg-eden-green hover:!text-eden-cream"
        />
      </div>
      </div>
    </section>
  );
}
