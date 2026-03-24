import nodemailer from "nodemailer";

const GMAIL_USER = "webeautifyboats.toronto@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail({ subject, html, replyTo }: MailOptions) {
  return transporter.sendMail({
    from: `"We Beautify Boats" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: replyTo ?? GMAIL_USER,
    subject,
    html,
  });
}

export async function verifyMailer() {
  return transporter.verify();
}
