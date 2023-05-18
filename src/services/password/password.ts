import crypto from "crypto";

const salt_extend = process.env.SALT_EXTEND || "S%29d8X++?@@soiw16^vg"


const createPasswordHash = (password: string): { hash: string, salt: string } => {
    let salt_first = crypto.randomBytes(16).toString('hex');
    const salt = salt_first + salt_extend;

    let hash = crypto
        .pbkdf2Sync(password, salt, 2000, 120, "sha512")
        .toString("hex");

    return { salt: salt_first, hash: hash }
}

const isValidPassword = (
    password: string,
    target_hash: string,
    target_salt_first: string
): boolean => {
    const salt = target_salt_first + salt_extend;
    let check_hash = crypto
        .pbkdf2Sync(password, salt, 2000, 120, "sha512")
        .toString("hex");

    return check_hash == target_hash;
}

export const PasswordGenerator = {
    createPasswordHash,
    isValidPassword
}
