import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: false, // true untuk port 465, false untuk 587
});

export async function sendEmail(to, subject, html) {
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
}