import SMTPTransport from "nodemailer/lib/smtp-transport";

export const ONE_SECOND_IN_MILISECOND = 1000;
export const ONE_MINUTE_IN_MILISECOND = 60 * ONE_SECOND_IN_MILISECOND;
export const ONE_HOUR_IN_MILISECOND = 60 * ONE_MINUTE_IN_MILISECOND;
export const ONE_DAY_IN_MILISECOND =  24 * ONE_HOUR_IN_MILISECOND;

export const VERIFY_EMAIL_CODE_FAILTIME = 3;
export const ACCESS_TOKEN_AGE = "5m";
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
export const VERIFY_EMAIL_CODE_MAXAGE = ONE_MINUTE_IN_MILISECOND * 3;

