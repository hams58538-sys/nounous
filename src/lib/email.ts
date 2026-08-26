import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Notifies staff by email when a new lead or candidate comes in.
 * Fails silently (logs only) — a missing email must never block a form submission.
 */
export async function notifyStaff(subject: string, body: string) {
  if (!resend || !process.env.NOTIFY_EMAIL) {
    console.warn("Email notification skipped — RESEND_API_KEY or NOTIFY_EMAIL not configured.");
    return;
  }
  try {
    await resend.emails.send({
      from: "Eden Agency <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL,
      subject,
      text: body,
    });
  console.log("Email notification sent to staff:", subject);
  } catch (err) {
    console.error("Email notification failed", err);
  }
}
