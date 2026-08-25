import { z } from "zod";

// Cameroon mobile numbers: +237 6XXXXXXXX or 6XXXXXXXX (9 digits after country code)
const phoneRegex = /^(\+237)?6\d{8}$/;

export const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().regex(phoneRegex, "Numéro camerounais invalide"),
  city: z.enum(["DOUALA", "YAOUNDE"]),
  roleType: z.enum(["NOUNOU", "MENAGERE", "LES_DEUX"]),
  liveInOut: z.enum(["live-in", "live-out", "both"]),
  startDate: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
  // honeypot — must stay empty; bots fill every field
  website: z.string().max(0).optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;

export const candidateSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  dateOfBirth: z.string().refine((d) => {
    const age = (Date.now() - new Date(d).getTime()) / (365.25 * 24 * 3600 * 1000);
    return age >= 18 && age <= 70;
  }, "L'âge doit être compris entre 18 et 70 ans"),
  phone: z.string().regex(phoneRegex, "Numéro camerounais invalide"),
  city: z.enum(["DOUALA", "YAOUNDE"]),
  quartier: z.string().trim().max(100).optional(),
  roleType: z.enum(["NOUNOU", "MENAGERE", "LES_DEUX"]),
  yearsExperience: z.coerce.number().int().min(0).max(60),
  availability: z.enum(["live-in", "live-out", "both"]),
  schedule: z.enum(["full-time", "part-time"]),
  startDate: z.string().optional(),
  experienceNotes: z.string().trim().max(2000).optional(),
  reference1Name: z.string().trim().max(100).optional(),
  reference1Phone: z.string().regex(phoneRegex).optional().or(z.literal("")),
  reference2Name: z.string().trim().max(100).optional(),
  reference2Phone: z.string().regex(phoneRegex).optional().or(z.literal("")),
  languages: z.string().trim().max(200).optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: "Le consentement est obligatoire" }),
  }),
  website: z.string().max(0).optional(), // honeypot
});
export type CandidateInput = z.infer<typeof candidateSchema>;

// File upload constraints, enforced server-side in the upload route —
// never trust the client-reported MIME type alone.
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_DOC_TYPES = [...ALLOWED_IMAGE_TYPES, "application/pdf"];
export const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB
