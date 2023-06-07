import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class EmailService {
    private static _transporter: nodemailer.Transporter;

    public static initTransporter(options: SMTPTransport.Options) {
        this._transporter = nodemailer.createTransport(options)
    }

    public static closeTransporter() {
        this._transporter?.close();
    }

    public static async sendMail(toMail: string, subject: string, text: string): Promise<boolean> {
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