"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/douala", label: "Douala" },
  { href: "/yaounde", label: "Yaoundé" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/a-propos", label: "À propos" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-eden-gold/30 bg-eden-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/logo-icon.png"
            alt="Éden agence"
            width={148}
            height={100}
            priority
            className="h-11 w-auto"
          />
          <span className="font-display text-xl font-semibold text-eden-green">
            Éden <span className="text-eden-green/70">agency</span>
          </span>
        </Link>

        <nav className="hidden gap-6 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-eden-ink transition hover:text-eden-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/demande"
            className="hidden rounded-full bg-eden-green px-5 py-2.5 text-sm font-semibold text-eden-cream transition hover:bg-eden-green-light sm:inline-block"
          >
            Faire une demande
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-eden-gold/40 text-eden-green lg:hidden"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigation mobile"
          className="flex flex-col gap-1 border-t border-eden-gold/20 bg-eden-cream px-5 py-4 lg:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-eden-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/demande"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-eden-green px-5 py-2.5 text-center text-sm font-semibold text-eden-cream"
          >
            Faire une demande
          </Link>
          <Link
            href="/postuler"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border-2 border-eden-green px-5 py-2.5 text-center text-sm font-semibold text-eden-green"
          >
            Postuler comme nounou / ménagère
          </Link>
        </nav>
      )}
    </header>
  );
}

