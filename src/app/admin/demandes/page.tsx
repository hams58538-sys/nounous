import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  NOUVELLE: "Nouvelle",
  EN_COURS: "En cours",
  PLACEE: "Placée",
  FERMEE: "Fermée",
};

export default async function LeadsAdminPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-2xl font-semibold text-eden-green">
        Demandes de familles ({leads.length})
      </h1>

      <div className="mt-6 space-y-4">
        {leads.map((l) => (
          <div key={l.id} className="rounded-xl border border-eden-gold/30 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{l.fullName}</p>
                <p className="text-sm text-eden-ink/60">
                  {l.city} · {l.roleType} · {l.liveInOut} · {l.phone}
                </p>
                {l.message && <p className="mt-1 text-sm text-eden-ink/80">{l.message}</p>}
              </div>
              <span className="rounded-full bg-eden-green/10 px-3 py-1 text-xs font-semibold text-eden-green">
                {statusLabels[l.status]}
              </span>
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <p className="text-sm text-eden-ink/60">Aucune demande pour le moment.</p>
        )}
      </div>
    </div>
  );
}
