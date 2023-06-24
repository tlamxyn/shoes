import { Request, Response, NextFunction } from "express";

import { ValidateWorker as Worker, ValidateCollector as Collector, ProductTypeSchema } from "../validator/validate";
import { BadRequest } from "../services/response_content/response_content";

export function Validate(type: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const collector = new Collector(req, type);
        const result = Worker.ajv.validate(collector.schema, collector.data);

        if (result) {
            res.locals[type] = collector.data;
            return next();
        }

        return BadRequest(res, { message: result })
    }
}