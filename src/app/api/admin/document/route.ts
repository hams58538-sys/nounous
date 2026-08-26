import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FIELDS = ["cniFrontKey", "cniBackKey", "photoKey", "cvKey"] as const;
type Field = (typeof ALLOWED_FIELDS)[number];

/**
 * Returns a signed, expiring URL for one candidate document.
 * Auth required — any logged-in staff (Recruiter or Admin) can view.
 * Every access is written to AuditLog so there's a record of who viewed what document, and when.
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const candidateId = req.nextUrl.searchParams.get("candidateId");
  const field = req.nextUrl.searchParams.get("field") as Field | null;

  if (!candidateId || !field || !ALLOWED_FIELDS.includes(field)) {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
  if (!candidate) {
    return NextResponse.json({ error: "Candidature introuvable" }, { status: 404 });
  }

  const publicId = candidate[field] as string | null;
  if (!publicId) {
    return NextResponse.json({ error: "Aucun document pour ce champ" }, { status: 404 });
  }

  // Signed URL valid for 5 minutes — short enough that a leaked link is low-risk,
  // long enough for staff to actually view the document.
  const expiresAt = Math.floor(Date.now() / 1000) + 5 * 60;
  const url = cloudinary.utils.private_download_url(publicId, "", {
    type: "authenticated",
    resource_type: "image",
    expires_at: expiresAt,
  });

  await prisma.auditLog.create({
    data: {
      actorId: (session.user as { id: string }).id,
      action: "DOCUMENT_VIEWED",
      targetType: "Candidate",
      targetId: candidateId,
      candidateId,
      detail: `Document consulté : ${field}`,
    },
  });

  return NextResponse.json({ url, expiresAt });
}
