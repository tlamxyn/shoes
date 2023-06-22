import multer, { MulterError } from "multer";

import { NextFunction, Request, Response } from "express";
import { BadRequest, InternalServerError } from "../services/response_content/response_content";

export async function UploadImages(req: Request, res: Response, next: NextFunction) {
    const upload = multer({
        limits: {
            fileSize: 4 * 1024 * 1024
        }
    }).array("images");
    return upload(req, res, function (error) {
        if (error instanceof MulterError) {
            return BadRequest(res, { message: `Ảnh không hợp lệ ${error.message}` });
        } else if (error) {
            return InternalServerError(res, { message: error.message });
        }
        next();
    })
}

export async function UploadImage(req: Request, res: Response, next: NextFunction) {
    const upload = multer({
        limits: {
            fileSize: 4 * 1024 * 1024
        }
    }).single("image");
    return upload(req, res, function (error) {
        if (error instanceof MulterError) {
            return BadRequest(res, { message: `Ảnh không hợp lệ ${error.message}` });
        } else if (error) {
            return InternalServerError(res, { message: error.message });
        }
        next();
    })
}