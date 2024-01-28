/* eslint-disable prettier/prettier */
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import * as nodemailer from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendEmail = async (
  email: string,
  subject: string,
  content: string,
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: parseInt(process.env.HOST_MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.HOST_MAIL_USER,
      pass: process.env.HOST_MAIL_PASSWORD,
    },
  } as SMTPConnection.Options);
  await transporter.sendMail({
    to: email,
    subject: subject,
    html: content,
  });
};
