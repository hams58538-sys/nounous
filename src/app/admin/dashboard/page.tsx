import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ChangePasswordModal from "./ChangePasswordModal";
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;

  const [pendingCandidates, newLeads, pendingTestimonials] = await Promise.all([
    prisma.candidate.count({ where: { status: "PENDING" } }),
    prisma.lead.count({ where: { status: "NOUVELLE" } }),
    prisma.testimonial.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-2xl font-semibold text-eden-green">
        Tableau de bord — {session?.user?.name}
      </h1>
      <p className="text-sm text-eden-ink/60">Rôle : {role === "ADMIN" ? "Administrateur complet" : "Recruteur"}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/candidats"
          className="rounded-2xl border border-eden-gold/40 bg-white p-6 transition hover:shadow-md"
        >
          <p className="text-3xl font-semibold text-eden-green">{pendingCandidates}</p>
          <p className="text-sm text-eden-ink/70">Candidatures en attente</p>
        </Link>
        <Link
          href="/admin/demandes"
          className="rounded-2xl border border-eden-gold/40 bg-white p-6 transition hover:shadow-md"
        >
          <p className="text-3xl font-semibold text-eden-green">{newLeads}</p>
          <p className="text-sm text-eden-ink/70">Nouvelles demandes de familles</p>
        </Link>
        <Link
          href="/admin/temoignages"
          className="rounded-2xl border border-eden-gold/40 bg-white p-6 transition hover:shadow-md sm:col-span-2"
        >
          <p className="text-3xl font-semibold text-eden-green">{pendingTestimonials}</p>
          <p className="text-sm text-eden-ink/70">Témoignages en attente de publication</p>
        </Link>
      </div>

      {role === "ADMIN" && (
        <Link
          href="/admin/parametres"
          className="mt-6 inline-block text-sm font-medium text-eden-blue underline"
        >
          Gérer les paramètres (numéros WhatsApp, comptes staff) →
        </Link>
      )}
      <ChangePasswordModal />
    </div>
  );
}
