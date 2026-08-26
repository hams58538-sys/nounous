import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { authorName, city, content, rating } = body as {
    authorName?: string;
    city?: string;
    content?: string;
    rating?: number;
  };

  if (
    !authorName ||
    typeof authorName !== "string" ||
    !content ||
    typeof content !== "string" ||
    !["DOUALA", "YAOUNDE"].includes(city ?? "")
  ) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const parsedRating = Number(rating) || 5;
  const testimonial = await prisma.testimonial.create({
    data: {
      authorName: authorName.trim().slice(0, 100),
      city: city as "DOUALA" | "YAOUNDE",
      content: content.trim().slice(0, 1000),
      rating: Math.min(5, Math.max(1, parsedRating)),
      status: "PENDING",
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: (session.user as { id: string }).id,
      action: "TESTIMONIAL_CREATED",
      targetType: "Testimonial",
      targetId: testimonial.id,
      detail: `Témoignage ajouté pour ${authorName}`,
    },
  });

  return NextResponse.json({ ok: true, id: testimonial.id });
}
