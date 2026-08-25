import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_KEYS = ["whatsapp_douala", "whatsapp_yaounde"];
const phoneRegex = /^\+237(6\d{8})$/;

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const body = await req.json();
  const updates: [string, string][] = Object.entries(body).filter(
    ([k]) => ALLOWED_KEYS.includes(k)
  ) as [string, string][];

  for (const [, value] of updates) {
    if (!phoneRegex.test(value)) {
      return NextResponse.json(
        { error: "Format de numéro invalide (attendu : +237 suivi de 9 chiffres commençant par 6)" },
        { status: 400 }
      );
    }
  }

  for (const [key, value] of updates) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    await prisma.auditLog.create({
      data: {
        actorId: (session!.user as { id: string }).id,
        action: "SETTING_UPDATE",
        targetType: "Setting",
        targetId: key,
        detail: `${key} mis à jour`,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
