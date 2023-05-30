import SMTPTransport from "nodemailer/lib/smtp-transport";

export const VERIFY_EMAIL_CODE_FAILTIME = 3;
export const ACCESS_TOKEN_AGE = "1h";
export const REFRESH_TOKEN_AGE = "30d";

export const PASSWORD_LENGTH = 240;
export const SALT_LENGTH = 32;
export const SMTPTransportOptions = {
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.MAIL_PORT || "465"),
    service: process.env.MAIL_SERVICE,
    secure: true,
    auth: {},
    tls: {
        rejectUnauthorized: false
    }
} as SMTPTransport.Options;