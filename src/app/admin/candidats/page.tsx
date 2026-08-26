import { prisma } from "@/lib/prisma";
import CandidateStatusForm from "./CandidateStatusForm";
import DocumentViewer from "./DocumentViewer";
import AdminPagination from "@/components/admin/AdminPagination";

const PAGE_SIZE = 20;

export default async function CandidatesAdminPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  const [candidates, total] = await Promise.all([
    prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.candidate.count(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-2xl font-semibold text-eden-green">
        Candidatures ({total})
      </h1>
      <p className="mt-1 text-sm text-eden-ink/60">
        Les documents (CNI, photo) sont stockés de façon privée. Cliquez sur
        un bouton ci-dessous pour générer un lien sécurisé temporaire (valable 5 minutes).
      </p>

      <div className="mt-6 space-y-4">
        {candidates.map((c) => (
          <div key={c.id} className="rounded-xl border border-eden-gold/30 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{c.fullName}</p>
                <p className="text-sm text-eden-ink/60">
                  {c.city} · {c.roleType} · {c.yearsExperience} ans d&apos;expérience · {c.phone}
                </p>
              </div>
              <CandidateStatusForm id={c.id} currentStatus={c.status} />
            </div>
            <DocumentViewer candidateId={c.id} hasCv={Boolean(c.cvKey)} />
          </div>
        ))}
        {candidates.length === 0 && (
          <p className="text-sm text-eden-ink/60">Aucune candidature pour le moment.</p>
        )}
      </div>

      <AdminPagination basePath="/admin/candidats" page={page} totalPages={totalPages} />
    </div>
  );
}
