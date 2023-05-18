import { Response } from "express"

type ResponseContent = {
    response: Response
    data: any,
    message: any
}

export const OK = (content: ResponseContent) => {
    const { response, data = undefined } = content;
    return response.status(200).json(JSON.parse(data));
}

export const Created = (content: ResponseContent) => {
    const { response, data = undefined } = content;
    return response.status(201).json(JSON.parse(data));
}

export const BadRequest = (content: ResponseContent) => {
    const {response, message = undefined} = content;
    return response.status(400).json(message);
}

export const Unauthorized = (content: ResponseContent) => {
    const {response, message = undefined} = content;
    return response.status(401).json(message);
}

export const Forbidden = (content: ResponseContent) => {
    const {response, message = undefined} = content;
    return response.status(403).json(message);
}

export const NotFound = (content: ResponseContent) => {
    const {response, message = undefined} = content;
    return response.status(404).json(message);
}