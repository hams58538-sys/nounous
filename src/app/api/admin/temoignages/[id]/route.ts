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
  if (!["PENDING", "PUBLISHED"].includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const testimonial = await prisma.testimonial.update({
    where: { id: params.id },
    data: { status },
  });

  await prisma.auditLog.create({
    data: {
      actorId: (session.user as { id: string }).id,
      action: "TESTIMONIAL_STATUS_CHANGE",
      targetType: "Testimonial",
      targetId: testimonial.id,
      detail: `Statut changé en ${status}`,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await prisma.testimonial.delete({ where: { id: params.id } });

  await prisma.auditLog.create({
    data: {
      actorId: (session.user as { id: string }).id,
      action: "TESTIMONIAL_DELETED",
      targetType: "Testimonial",
      targetId: params.id,
    },
  });

  return NextResponse.json({ ok: true });
}
