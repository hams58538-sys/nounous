import { prisma } from "@/lib/prisma";

export type Branch = "DOUALA" | "YAOUNDE";

/**
 * Resolves the correct WhatsApp number for a branch.
 * Reads from the editable `Setting` table first (admin-managed),
 * falling back to env vars if settings aren't seeded yet.
 *
 * IMPORTANT: callers must only ever request ONE branch's number at a time —
 * the UI must never render both numbers together. The branch is decided by
 * the city the visitor already selected (form field or /douala vs /yaounde page).
 */
export async function getWhatsAppNumber(branch: Branch): Promise<string> {
  const key = branch === "DOUALA" ? "whatsapp_douala" : "whatsapp_yaounde";
  const fallback =
    branch === "DOUALA"
      ? process.env.WHATSAPP_DOUALA ?? "+237670638233"
      : process.env.WHATSAPP_YAOUNDE ?? "+237657990371";

  try {
    const setting = await prisma.setting.findUnique({ where: { key } });
    return setting?.value ?? fallback;
  } catch {
    // DB not reachable (e.g. local dev without a configured DB yet) — safe fallback
    return fallback;
  }
}

/** Builds a wa.me click-to-chat link with a pre-filled, text-only message. */
export function buildWhatsAppLink(number: string, message: string): string {
  const digits = number.replace(/[^\d+]/g, "");
  return `https://wa.me/${digits.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
