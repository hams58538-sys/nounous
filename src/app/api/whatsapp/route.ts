import { NextRequest, NextResponse } from "next/server";
import { getWhatsAppNumber, buildWhatsAppLink, Branch } from "@/lib/whatsapp";

// Returns a click-to-chat link for exactly ONE branch — the branch the
// visitor already chose in the form. Never returns both numbers together.
export async function GET(req: NextRequest) {
  const branch = req.nextUrl.searchParams.get("branch") as Branch | null;
  const message = req.nextUrl.searchParams.get("message") ?? "Bonjour Eden Agency.";

  if (branch !== "DOUALA" && branch !== "YAOUNDE") {
    return NextResponse.json({ error: "Branche invalide" }, { status: 400 });
  }

  const number = await getWhatsAppNumber(branch);
  return NextResponse.json({ href: buildWhatsAppLink(number, message) });
}
