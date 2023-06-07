import JWT from "jsonwebtoken";
import { ACCESS_TOKEN_AGE, REFRESH_TOKEN_AGE } from "../contant";

export function SignAccessToken(payload: Object) {
    return JWT.sign(
        payload,
        process.env.ACCESS_PRIVATE_KEY ?? "123456789ADOC",
        { algorithm: "HS512", expiresIn: ACCESS_TOKEN_AGE }
    );
}

export function SignRefreshToken(payload: Object, secret: string) {
    return JWT.sign(
        payload,
        secret ?? "123456789ADOC",
        { algorithm: "HS512", expiresIn: REFRESH_TOKEN_AGE }
    );
}

export function VerifyAccessToken(token: string): JWT.Jwt | JWT.JsonWebTokenError{
    try {
        const result = JWT.verify(
            token,
            process.env.ACCESS_PRIVATE_KEY ?? "123456789ADOC",
            { complete: true }
        )
        return result
    } catch (error: any) {
        if (error instanceof JWT.JsonWebTokenError) {
            return error
        }
        else {
            throw error
        }
    }
}

export function GetPayload(token: string): string | JWT.JwtPayload | JWT.JsonWebTokenError{
    try {
        const result = JWT.verify(
            token,
            process.env.ACCESS_PRIVATE_KEY ?? "123456789ADOC",
            { ignoreExpiration: true }
        )
        return result
    } catch (error: any) {
        if (error instanceof JWT.JsonWebTokenError) {
            return error
        }
        else {
            throw error
        }
    }
}


export function VerifyRefreshToken(token: string, secret: string): JWT.Jwt | JWT.JsonWebTokenError{
    try {
        const result = JWT.verify(
            token,
            secret ?? "123456789ADOC",
            { complete: true }
        )
        return result
    } catch (error: any) {
        if (error instanceof JWT.JsonWebTokenError) {
            return error
        }
        else {
            throw error
        }
    }
}

export function isExpiredJwtError(error: JWT.JsonWebTokenError): boolean {
    return error.message == "jwt expired"
}