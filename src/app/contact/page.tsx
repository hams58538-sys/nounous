import type { Metadata } from "next";
import ContactCitySelector from "./ContactCitySelector";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Eden Agency par WhatsApp à Douala ou Yaoundé pour toute question sur le placement de nounous et ménagères.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center">
      <h1 className="font-display text-4xl font-semibold text-eden-green">Contact</h1>
      <p className="mt-3 text-eden-ink/70">
        Choisissez votre ville pour être mis en relation avec la bonne équipe sur WhatsApp.
      </p>
      <div className="mt-10">
        <ContactCitySelector />
      </div>
    </div>
  );
}
