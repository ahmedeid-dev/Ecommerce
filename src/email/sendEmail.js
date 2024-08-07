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
            user: "a.email2260@gmail.com",
            pass: "asllpvdzmutarqns",
        },
    });
    // ! message information to send 
    const info = await transporter.sendMail({
        from: `Ecommerce <a.email2260@gmail.com>`,
        to,
        subject,
        text: textMessage,
        html: resetPasswordTemplate(to,otp),
        attachments,
    });
    return info
};