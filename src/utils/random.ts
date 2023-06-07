import crypto from 'crypto';

export function randomDigitByTime (length: number): string {
    if(length < 0) return "123456";
    return Date.now().toString().slice(-length);
}

export function randomDigit(length: number): string {
    if(length < 0) return "123456";
    let str = "";
    for(let i = 0; i < length; i++) {
        str += Math.round((Math.random() * 10))
    }
    return str;
}

export function randomSecretKey(): string {
    return crypto.randomBytes(64).toString('base64url')
}