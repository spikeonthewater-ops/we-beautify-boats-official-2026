import nodemailer from "nodemailer";

const FROM_ADDRESS = '"We Beautify Boats" <bookings@webeautifyboats.com>';
const TO_ADDRESS = "webeautifyboats.toronto@gmail.com";

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

export interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail({ subject, html, replyTo }: MailOptions) {
  return transporter.sendMail({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: replyTo ?? TO_ADDRESS,
    subject,
    html,
  });
}

export async function verifyMailer() {
  return transporter.verify();
}
