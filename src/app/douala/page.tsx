import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Nounou et Ménagère à Douala",
  description:
    "Eden Agency place des nounous et ménagères de confiance à Douala. Personnel vérifié et sélectionné avec soin.",
  alternates: { canonical: "/douala" },
};

export default function DoualaPage() {
  return (
    <section className="bg-cover bg-center" style={{ backgroundImage: 'url("/images/housebg.jpg")' }}>
      <div className="mx-auto max-w-4xl bg-eden-cream/70 px-5 py-16 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://edenagency.vercel.app/douala#business",
            name: "Eden Agency — Douala",
            url: "https://edenagency.vercel.app/douala",
            image: "https://edenagency.vercel.app/logo-full.png",
            telephone: "+237670638233",
            areaServed: "Douala, Cameroun",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Douala",
              addressCountry: "CM",
            },
            description:
              "Agence de placement de nounous et ménagères à Douala.",
            parentOrganization: { "@id": "https://edenagency.vercel.app/#organization" },
          }),
        }}
      />
      <p className="text-sm font-semibold uppercase tracking-widest text-eden-blue">
        📍 Douala
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-eden-green">
        Nounous & ménagères de confiance à Douala
      </h1>
      <p className="mt-4 text-eden-ink/80">
        Nous vous proposons des nounous et ménagères fiables, expérimentées et
        soigneusement sélectionnées, disponibles dans tous les quartiers de Douala.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/demande?ville=DOUALA"
          className="rounded-full bg-eden-green px-6 py-3 font-semibold text-eden-cream transition hover:bg-eden-green-light"
        >
          Faire une demande à Douala
        </Link>
        <WhatsAppButton
          branch="DOUALA"
          message="Bonjour, je souhaite des renseignements sur vos services à Douala."
          label="Discuter sur WhatsApp"
          className="!bg-transparent !text-eden-green border-2 border-eden-green hover:!bg-eden-green hover:!text-eden-cream"
        />
      </div>
      </div>
    </section>
  );
}
