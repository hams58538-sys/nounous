import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Ce que disent les familles qui font confiance à Eden Agency pour le placement de leurs nounous et ménagères à Douala et Yaoundé.",
  alternates: { canonical: "/temoignages" },
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-semibold text-eden-green">Témoignages</h1>
      <p className="mt-2 text-eden-ink/70">
        Ce que disent les familles qui nous font confiance.
      </p>
      <div className="mt-10 space-y-6">
        {testimonials.map((t) => (
          <blockquote key={t.id} className="rounded-2xl border border-eden-gold/30 bg-white p-6">
            <p className="text-eden-ink/90">&ldquo;{t.content}&rdquo;</p>
            <footer className="mt-3 text-sm font-semibold text-eden-green">
              — {t.authorName}, {t.city === "DOUALA" ? "Douala" : "Yaoundé"}
            </footer>
          </blockquote>
        ))}
        {testimonials.length === 0 && (
          <p className="text-sm text-eden-ink/60">Aucun témoignage publié pour le moment.</p>
        )}
      </div>
    </div>
  );
}
