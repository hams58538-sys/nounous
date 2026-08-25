import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 bg-eden-green py-12 text-eden-cream">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Image
              src="/logo-icon.png"
              alt="Éden agence"
              width={148}
              height={100}
              className="h-12 w-auto"
            />
            <p className="mt-2 text-sm text-eden-cream/80">
              Confiance · Qualité · Sérénité
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-eden-gold">Liens</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/postuler">Postuler comme nounou / ménagère</Link></li>
              <li><Link href="/demande">Faire une demande de placement</Link></li>
              <li><Link href="/temoignages">Témoignages</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-eden-gold">Légal</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/confidentialite">Politique de confidentialité</Link></li>
              <li><Link href="/conditions">Conditions d&apos;utilisation</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-eden-cream/20 pt-6 text-center font-display text-sm italic text-eden-cream/70">
          Eden agency, le choix de la tranquillité au quotidien.
        </p>
      </div>
    </footer>
  );
}
