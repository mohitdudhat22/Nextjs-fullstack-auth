import { metadata } from './../app/layout';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hashed tokem
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log("hashed token", hashedToken);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { VerifyToken: hashedToken, VerifyTokenExpiry: Date.now() + 3600000 });
        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, { ForgetPasswordToken: hashedToken, ForgetPasswordTokenExpiry: Date.now() + 3600000 });
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5912fdf6c00b5d",
                pass: "b2a636f83b7867"
            }
        });

        const mailOptions = {
            from: "mohitdudhat22@gmail.com",
            to: email,
            subject: emailType == "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType == 'VERIFY' ? '/verifyemail' : '/resetpassword'}?token=${hashedToken}">here</a> to ${emailType == "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}
