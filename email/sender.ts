'use server';
import nodemailer from 'nodemailer';
import {number, undefined} from "zod";
import SMTPPool from "nodemailer/lib/smtp-pool";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;
const transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: 587,
    secure: true,
    requireTLS: true,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD
    },
    tls: {
        minVersion: 'TLSv1.2', // Enforce TLS 1.2
        rejectUnauthorized: true, // Ensure valid certificate
    },
});

export async function sendMail({
                                   email,
                                   sendTo,
                                   subject,
                                   text,
                                   html,
                               }: {
    email: string;
    sendTo?: string;
    subject: string;
    text: string;
    html?: string;
}) {
    try {
        const isVerified = await transporter.verify();
    } catch (error) {
        console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
        return;
    }
    const info = await transporter.sendMail({
        from: email,
        to: sendTo || SITE_MAIL_RECIEVER,
        subject: subject,
        text: text,
        html: html ? html : '',
    });
    console.log('Message Sent', info.messageId);
    console.log('Mail sent to', SITE_MAIL_RECIEVER);
    return info;
}
