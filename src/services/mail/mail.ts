import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export class EmailService {
    private static _transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.MAIL_PORT || "465"),
        service: process.env.MAIL_SERVICE,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    public static closeTransporter() {
        this._transporter.close();
    }

    public static async sendMail(toMail: string, subject: string, text: string) {
        return new Promise((resolve, reject) => {

            let mailOptions: MailOptions = {
                from: process.env.MAIL_USERNAME,
                to: toMail,
                subject: subject,
                text: text
            }

            this._transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                    resolve(false);
                }
                resolve(true);
            })
        });
    }
}