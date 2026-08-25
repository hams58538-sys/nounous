import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Editable WhatsApp numbers — changeable anytime from /admin/parametres (ADMIN role only)
  await prisma.setting.upsert({
    where: { key: "whatsapp_douala" },
    update: {},
    create: { key: "whatsapp_douala", value: "+237670638233" },
  });
  await prisma.setting.upsert({
    where: { key: "whatsapp_yaounde" },
    update: {},
    create: { key: "whatsapp_yaounde", value: "+237657990371" },
  });

  // Demo admin account — CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN
  const passwordHash = await bcrypt.hash("ChangeMe_On_FirstLogin!", 12);
  await prisma.user.upsert({
    where: { email: "admin@edenagency.cm" },
    update: {},
    create: {
      name: "Admin Principal",
      email: "admin@edenagency.cm",
      passwordHash,
      role: "ADMIN",
    },
  });

  // Demo testimonials — clearly marked, replace via admin panel
  await prisma.testimonial.createMany({
    data: [
      {
        authorName: "Famille N. (démo)",
        city: "DOUALA",
        content:
          "Exemple de témoignage — à remplacer par un vrai avis via le tableau de bord admin.",
        rating: 5,
        status: "PUBLISHED",
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
