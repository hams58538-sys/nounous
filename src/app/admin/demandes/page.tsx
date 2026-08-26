import { prisma } from "@/lib/prisma";
import LeadStatusForm from "./LeadStatusForm";
import AdminPagination from "@/components/admin/AdminPagination";

const PAGE_SIZE = 20;

export default async function LeadsAdminPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.lead.count(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-2xl font-semibold text-eden-green">
        Demandes de familles ({total})
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
              <LeadStatusForm id={l.id} currentStatus={l.status} />
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <p className="text-sm text-eden-ink/60">Aucune demande pour le moment.</p>
        )}
      </div>

      <AdminPagination basePath="/admin/demandes" page={page} totalPages={totalPages} />
    </div>
  );
}
