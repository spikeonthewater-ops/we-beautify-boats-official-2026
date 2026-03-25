import { Resend } from "resend";

const FROM_ADDRESS = "We Beautify Boats <bookings@webeautifyboats.com>";
const TO_ADDRESS = "webeautifyboats.toronto@gmail.com";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not configured");
    _resend = new Resend(key);
  }
  return _resend;
}

export interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail({ subject, html, replyTo }: MailOptions) {
  const resend = getResend();
  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: replyTo ?? TO_ADDRESS,
    subject,
    html,
  });
  if (result.error) {
    throw new Error(result.error.message ?? "Resend failed to send email");
  }
  return result;
}

export async function verifyMailer() {
  const resend = getResend();
  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    subject: "✅ WBB Mailer Test",
    html: "<p>Resend is wired up and working for We Beautify Boats.</p>",
  });
  return !result.error;
}
