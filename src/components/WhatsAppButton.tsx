import { getWhatsAppNumber, buildWhatsAppLink, Branch } from "@/lib/whatsapp";

/**
 * Renders exactly ONE WhatsApp button, for exactly ONE branch.
 * The branch is decided upstream (city page or form selection) —
 * this component never has access to both numbers at once by design.
 */
export default async function WhatsAppButton({
  branch,
  message,
  label = "Continuer sur WhatsApp",
  className = "",
}: {
  branch: Branch;
  message: string;
  label?: string;
  className?: string;
}) {
  const number = await getWhatsAppNumber(branch);
  const href = buildWhatsAppLink(number, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-eden-green px-6 py-3 font-body font-semibold text-eden-cream transition hover:bg-eden-green-light ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.19c-.24.68-1.4 1.3-1.93 1.34-.5.04-1.03.25-3.46-.72-2.93-1.17-4.78-4.12-4.93-4.31-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
      </svg>
      {label}
    </a>
  );
}
