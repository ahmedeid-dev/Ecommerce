import { resetPasswordTemplate } from "./emailHtml.js";
import nodemailer from "nodemailer";

// ! send email service with nodemailer
export const sendEmailService = async (
    {
        to,
        otp,
        textMessage = "",
        attachments = [] } = {}
) => {
    // ! configuration Email
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        },
    });
    // ! message information to send 
    const info = await transporter.sendMail({
        from: `Ecommerce <${process.env.user}>`,
        to,
        subject,
        text: textMessage,
        html: resetPasswordTemplate(to,otp),
        attachments,
    });
    return info
};