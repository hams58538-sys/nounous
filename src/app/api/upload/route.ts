import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ALLOWED_DOC_TYPES, MAX_FILE_BYTES } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Minimal magic-byte check so a renamed .exe can't pass as image/pdf just
// because the browser sent a spoofed Content-Type header.
function sniffType(buffer: Buffer): string | null {
  const hex = buffer.subarray(0, 4).toString("hex");
  if (hex.startsWith("ffd8ff")) return "image/jpeg";
  if (hex === "89504e47") return "image/png";
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF") return "image/webp";
  if (buffer.subarray(0, 4).toString("ascii") === "%PDF") return "application/pdf";
  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = await checkRateLimit(`upload:${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const purpose = formData.get("purpose") as string | null; // "cni-front" | "cni-back" | "photo" | "cv"

  if (!file || !purpose) {
    return NextResponse.json({ error: "Fichier ou objet manquant" }, { status: 400 });
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 8MB)" }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const realType = sniffType(buffer);
  if (!realType || !ALLOWED_DOC_TYPES.includes(realType)) {
    return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 415 });
  }

  try {
    // upload_preset with `type: authenticated` keeps CNI/ID docs off public URLs;
    // the admin dashboard generates short-lived signed URLs on demand.
    const uploadResult = await new Promise<{ public_id: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            type: "authenticated",
            folder: `eden-agency/${purpose}`,
          },
          (err, result) => (err || !result ? reject(err) : resolve(result))
        )
        .end(buffer);
    });

    return NextResponse.json({ key: uploadResult.public_id });
  } catch (err) {
    console.error("Upload failed", err);
    return NextResponse.json({ error: "Échec du téléversement" }, { status: 500 });
  }
}
