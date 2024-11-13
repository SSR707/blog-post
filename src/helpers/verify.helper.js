import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})

export const sendMail = async (to , subject, text, html) =>{
    await transport.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
        html,
    })
}