import { CookieOptions, Response } from "express";

export function setCookie(
    res: Response,
    name: string,
    value: string,
    option: CookieOptions | null = null
): void {
    res.cookie(name, value, option ?? { httpOnly: true, maxAge: 2592000000 })
}

export function setCookies(
    res: Response,
    data: Object,
    option: CookieOptions | null = null
): void {
    Object.entries(data).forEach(value => {
        res.cookie(value[0], value[1], option ?? { httpOnly: true, maxAge: 2592000000 })
    })
}