import { Response } from "express"

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type ResponseContent = Optional<{
    data: any | undefined,
    message: any | undefined
}, 'data' | 'message'>

export const OK = (response: Response, content: ResponseContent | null = null): Response => {
    const { data = undefined } = content || {};
    return response.status(200).json({ data });
}

export const Created = (response: Response, content: ResponseContent | null): Response => {
    const { data = undefined } = content || {};
    return response.status(201).json({ data });
}

export const BadRequest = (response: Response, content: ResponseContent | null): Response => {
    const { message = undefined } = content || {};
    return response.status(400).json({ message });
}

export const Unauthorized = (response: Response, content: ResponseContent | null): Response => {
    const { message = undefined } = content || {};
    return response.status(401).json({ message });
}

export const Forbidden = (response: Response, content: ResponseContent | null): Response => {
    const { message = undefined } = content || {};
    return response.status(403).json({ message });
}

export const NotFound = (response: Response, content: ResponseContent | null): Response => {
    const { message = undefined } = content || {};
    return response.status(404).json({ message });
}

export const InternalServerError = (response: Response, content: ResponseContent | null): Response => {
    const { message = undefined } = content || {};
    return response.status(500).json({ message });
}