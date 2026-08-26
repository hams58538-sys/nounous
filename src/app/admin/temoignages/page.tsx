import { prisma } from "@/lib/prisma";
import TestimonialActions from "./TestimonialActions";
import NewTestimonialForm from "./NewTestimonialForm";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-2xl font-semibold text-eden-green">
        Témoignages ({testimonials.length})
      </h1>
      <p className="mt-1 text-sm text-eden-ink/60">
        Seuls les témoignages publiés apparaissent sur la page publique /temoignages.
      </p>

      <div className="mt-6">
        <NewTestimonialForm />
      </div>

      <div className="mt-6 space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl border border-eden-gold/30 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{t.authorName} — {t.city === "DOUALA" ? "Douala" : "Yaoundé"}</p>
                <p className="mt-1 text-sm text-eden-ink/80">{t.content}</p>
                <p className="mt-1 text-xs text-eden-gold">{"★".repeat(t.rating)}</p>
              </div>
              <TestimonialActions id={t.id} status={t.status} />
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="text-sm text-eden-ink/60">Aucun témoignage pour le moment.</p>
        )}
      </div>
    </div>
  );
}
