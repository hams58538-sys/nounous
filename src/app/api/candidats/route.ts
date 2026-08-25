import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { candidateSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { notifyStaff } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = await checkRateLimit(`candidate:${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = candidateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  // honeypot tripped — silently pretend success so bots don't learn
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { cniFrontKey, cniBackKey, photoKey, cvKey } = body as {
    cniFrontKey?: string;
    cniBackKey?: string;
    photoKey?: string;
    cvKey?: string;
  };
  if (!cniFrontKey || !cniBackKey || !photoKey) {
    return NextResponse.json(
      { error: "CNI (recto/verso) et photo requis avant soumission" },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const candidate = await prisma.candidate.create({
    data: {
      fullName: data.fullName,
      dateOfBirth: new Date(data.dateOfBirth),
      phone: data.phone,
      city: data.city,
      quartier: data.quartier,
      roleType: data.roleType,
      yearsExperience: data.yearsExperience,
      availability: data.availability,
      schedule: data.schedule,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      experienceNotes: data.experienceNotes,
      reference1Name: data.reference1Name,
      reference1Phone: data.reference1Phone || undefined,
      reference2Name: data.reference2Name,
      reference2Phone: data.reference2Phone || undefined,
      languages: data.languages,
      cniFrontKey,
      cniBackKey,
      photoKey,
      cvKey,
      consentGiven: true,
    },
  });

  await notifyStaff(
    "Nouvelle candidature",
    `Candidate : ${data.fullName}\nTéléphone : ${data.phone}\nVille : ${data.city}\nPoste : ${data.roleType}\nExpérience : ${data.yearsExperience} ans`
  );

  // NOTE: no ID document or fee information is ever included in the
  // WhatsApp handoff — see /postuler page for the text-only message built client-side.
  return NextResponse.json({ ok: true, id: candidate.id });
}
