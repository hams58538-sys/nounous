import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsForm from "./SettingsForm";
export const dynamic = "force-dynamic";
export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") redirect("/admin/dashboard");

  const [douala, yaounde] = await Promise.all([
    prisma.setting.findUnique({ where: { key: "whatsapp_douala" } }),
    prisma.setting.findUnique({ where: { key: "whatsapp_yaounde" } }),
  ]);

  return (
    <div className="mx-auto max-w-lg px-5 py-12">
      <h1 className="font-display text-2xl font-semibold text-eden-green">Paramètres</h1>
      <p className="mt-1 text-sm text-eden-ink/60">
        Réservé aux administrateurs complets. Chaque changement est enregistré dans le journal d&apos;audit.
      </p>
      <SettingsForm
        initialDouala={douala?.value ?? ""}
        initialYaounde={yaounde?.value ?? ""}
      />
    </div>
  );
}
