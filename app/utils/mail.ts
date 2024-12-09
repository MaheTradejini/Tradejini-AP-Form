import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE, // true
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // Optional: Allow self-signed certificates
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
    logger: true,
    debug: true,
   
} as SMTPTransport.Options)

type sendEmailDto = {
    sender: Mail.Address,
    receipients: Mail.Address[],
    subject: string;
    message: string;
}
export const sendEmail = async (dto: sendEmailDto) => {
  const {sender, receipients, subject, message} =  dto;

  return await transport.sendMail({
        from: sender,
        to: receipients,
        subject,
        html: message,
        text: message,
  })
}