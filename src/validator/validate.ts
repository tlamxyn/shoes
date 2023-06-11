import Ajv from "ajv";
import * as ProductTypeSchema from "./schema/producttype";
import * as GeneralSchema from "./schema/general";
import { Request } from "express";

export {
    GeneralSchema,
    ProductTypeSchema,
}

/**
 * @description
 * This class is used to validate input schema
 * Just init it in startup file like:
 * 
 * ```
 * ValidateWorker.init()
 * ```
 */
export class ValidateWorker {
    public static ajv: Ajv;
    public static init() {
        this.ajv = new Ajv();

        this.ajv.addFormat("uuid", /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)

        this.ajv.addSchema(GeneralSchema.PaginationSchema, "PaginationSchema")

        this.ajv.addSchema(ProductTypeSchema.CreateProductTypeSchema, "CreateProductTypeSchema")
        this.ajv.addSchema(ProductTypeSchema.GetOneProductTypeSchema, "GetOneProductTypeSchema")
        this.ajv.addSchema(ProductTypeSchema.UpdateProductTypeSchema, "UpdateProductTypeSchema")
        this.ajv.addSchema(ProductTypeSchema.DeleteProductTypeSchema, "DeleteProductTypeSchema")


        Object.entries(this.ajv.schemas).forEach(name => {
            this.ajv.getSchema(name[0])
        })
    }
}

/**
 * @description
 * Before using ValidateWorker to validate input,
 * using ValidateCollector to get all needed parameters that separate every where:
 *  - body ex: https://example.com/user (deep in request body)
 *  - path ex: https://example.com/user/:id
 *  - query ex: https://example.com/user?name=Lam
 * 
 * by function `collectData`, it will return `data` property in ValidateCollector object.
 * Then ValidateWorker will check the correction of 
 * Lastly, middleware will store it `res.locals.input`:
 * 
 * ```
 * const collector = new ValidateCollector(req, type);
 * req.locals.input = collector.data
 * ```
 */
export class ValidateCollector {
    req: Request;
    type: string;
    data: Object = {}
    schema = {}
    constructor(req: Request, type: string) {
        this.req = req;
        this.type = type;
        this.collectData()
    }

    public collectData() {
        if (this.type === "PaginationSchema") {
            this.schema = GeneralSchema.PaginationSchema;
            this.data = {
                limit: parseInt(this.req.query.limit?.toString() ?? "10"),
                page: parseInt(this.req.query.page?.toString() ?? "1")
            } as GeneralSchema.PaginationSchema
            return;
        }
        if (this.type === "CreateProductTypeSchema") {
            this.schema = ProductTypeSchema.CreateProductTypeSchema;
            this.data = {
                Name: this.req.body.Name
            } as ProductTypeSchema.CreateProductTypeSchema;
            return;
        }
        if (this.type === "UpdateProductTypeSchema") {
            this.schema = ProductTypeSchema.UpdateProductTypeSchema;
            this.data = {
                ID: this.req.body.ID,
                Name: this.req.body.Name
            } as ProductTypeSchema.UpdateProductTypeSchema;
            return;
        }
        if (this.type === "DeleteProductTypeSchema") {
            this.schema = ProductTypeSchema.DeleteProductTypeSchema;
            this.data = {
                ID: this.req.params.producttype_id
            } as ProductTypeSchema.DeleteProductTypeSchema;
            return;
        }
        if (this.type === "GetOneProductTypeSchema") {
            this.schema = ProductTypeSchema.GetOneProductTypeSchema;
            this.data = {
                ID: this.req.params.producttype_id
            } as ProductTypeSchema.GetOneProductTypeSchema;
            return;
        }
    }
}