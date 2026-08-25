import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { notifyStaff } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = await checkRateLimit(`lead:${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }); // honeypot tripped
  }

  const data = parsed.data;
  const lead = await prisma.lead.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      city: data.city,
      roleType: data.roleType,
      liveInOut: data.liveInOut,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      message: data.message,
    },
  });

  await notifyStaff(
    "Nouvelle demande de placement",
    `Famille : ${data.fullName}\nTéléphone : ${data.phone}\nVille : ${data.city}\nRecherche : ${data.roleType}\nLogement : ${data.liveInOut}\nMessage : ${data.message ?? "-"}`
  );

  return NextResponse.json({ ok: true, id: lead.id });
}
