import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { status } = await req.json();
  if (!["PENDING", "VERIFIED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const candidate = await prisma.candidate.update({
    where: { id: params.id },
    data: { status },
  });

  await prisma.auditLog.create({
    data: {
      actorId: (session.user as { id: string }).id,
      action: "CANDIDATE_STATUS_CHANGE",
      targetType: "Candidate",
      targetId: candidate.id,
      candidateId: candidate.id,
      detail: `Statut changé en ${status}`,
    },
  });

  return NextResponse.json({ ok: true });
}
