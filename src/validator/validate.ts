import Ajv from "ajv";
import * as ProductSchema from "./schema/product";
import * as ItemSchema from "./schema/item";
import * as ProductTypeSchema from "./schema/producttype";
import * as VariationSchema from "./schema/variation";
import * as VariationValueSchema from "./schema/variationvalue";
import * as VariationValueGroupSchema from "./schema/variationvaluegroup";
import * as GeneralSchema from "./schema/general";
import { Request } from "express";

export {
    GeneralSchema,
    ProductSchema,
    ItemSchema,
    ProductTypeSchema,
    VariationSchema,
    VariationValueSchema,
    VariationValueGroupSchema
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

        this.ajv.addSchema(ProductSchema.CreateProductSchema, "CreateProductSchema")
        this.ajv.addSchema(ProductSchema.GetOneProductSchema, "GetOneProductSchema")
        this.ajv.addSchema(ProductSchema.UpdateProductSchema, "UpdateProductSchema")
        this.ajv.addSchema(ProductSchema.DeleteProductSchema, "DeleteProductSchema")

        this.ajv.addSchema(ItemSchema.CreateItemSchema, "CreateItemSchema")
        this.ajv.addSchema(ItemSchema.GetOneItemSchema, "GetOneItemSchema")
        this.ajv.addSchema(ItemSchema.GetListItemSchema, "GetListItemSchema")
        this.ajv.addSchema(ItemSchema.UpdateItemSchema, "UpdateItemSchema")
        this.ajv.addSchema(ItemSchema.DeleteItemSchema, "DeleteItemSchema")

        this.ajv.addSchema(VariationSchema.CreateVariationSchema, "CreateVariationSchema")
        this.ajv.addSchema(VariationSchema.GetOneVariationSchema, "GetOneVariationSchema")
        this.ajv.addSchema(VariationSchema.UpdateVariationSchema, "UpdateVariationSchema")
        this.ajv.addSchema(VariationSchema.DeleteVariationSchema, "DeleteVariationSchema")

        this.ajv.addSchema(VariationValueSchema.CreateVariationValueSchema, "CreateVariationValueSchema")
        this.ajv.addSchema(VariationValueSchema.GetOneVariationValueSchema, "GetOneVariationValueSchema")
        this.ajv.addSchema(VariationValueSchema.GetListVariationValueSchema, "GetListVariationValueSchema")
        this.ajv.addSchema(VariationValueSchema.UpdateVariationValueSchema, "UpdateVariationValueSchema")
        this.ajv.addSchema(VariationValueSchema.DeleteVariationValueSchema, "DeleteVariationValueSchema")

        this.ajv.addSchema(VariationValueGroupSchema.CreateVariationValueGroupSchema, "CreateVariationValueGroupSchema")
        this.ajv.addSchema(VariationValueGroupSchema.GetListVariationValueGroupSchema, "GetListVariationValueGroupSchema")
        this.ajv.addSchema(VariationValueGroupSchema.DeleteVariationValueGroupSchema, "DeleteVariationValueGroupSchema")

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

        // Pagination
        if (this.type === "PaginationSchema") {
            this.schema = GeneralSchema.PaginationSchema;
            this.data = {
                limit: parseInt(this.req.query.limit?.toString() ?? "10"),
                page: parseInt(this.req.query.page?.toString() ?? "1")
            } as GeneralSchema.PaginationSchema
            return;
        }

        // ProductType
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
                ID: this.req.params.producttype_id,
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

        // Product
        if (this.type === "CreateProductSchema") {
            this.schema = ProductSchema.CreateProductSchema;
            this.data = {
                Name: this.req.body.Name,
                ProductTypeID: this.req.body.ProductTypeID,
                Description: this.req.body.Description
            } as ProductSchema.CreateProductSchema;
            return;
        }
        if (this.type === "UpdateProductSchema") {
            this.schema = ProductSchema.UpdateProductSchema;
            this.data = {
                ID: this.req.params.product_id,
                ProductTypeID: this.req.body.ProductTypeID,
                Name: this.req.body.Name,
                Description: this.req.body.Description
            } as ProductSchema.UpdateProductSchema;
            return;
        }
        if (this.type === "DeleteProductSchema") {
            this.schema = ProductSchema.DeleteProductSchema;
            this.data = {
                ID: this.req.params.product_id
            } as ProductSchema.DeleteProductSchema;
            return;
        }
        if (this.type === "GetOneProductSchema") {
            this.schema = ProductSchema.GetOneProductSchema;
            this.data = {
                ID: this.req.params.product_id
            } as ProductSchema.GetOneProductSchema;
            return;
        }

        // Variation
        if (this.type === "CreateVariationSchema") {
            this.schema = VariationSchema.CreateVariationSchema;
            this.data = {
                Type: this.req.body.Type,
                Name: this.req.body.Name
            } as VariationSchema.CreateVariationSchema;
            return;
        }
        if (this.type === "GetOneVariationSchema") {
            this.schema = VariationSchema.GetOneVariationSchema;
            this.data = {
                ID: this.req.params.variation_id
            } as VariationSchema.GetOneVariationSchema;
            return;
        }
        if (this.type === "UpdateVariationSchema") {
            this.schema = VariationSchema.UpdateVariationSchema;
            this.data = {
                ID: this.req.params.variation_id,
                Type: this.req.body.Type,
                Name: this.req.body.Name
            } as VariationSchema.UpdateVariationSchema;
            return;
        }
        if (this.type === "DeleteVariationSchema") {
            this.schema = VariationSchema.DeleteVariationSchema;
            this.data = {
                ID: this.req.params.variation_id
            } as VariationSchema.DeleteVariationSchema;
            return;
        }

        // VariationValue
        if (this.type === "CreateVariationValueSchema") {
            this.schema = VariationValueSchema.CreateVariationValueSchema;
            this.data = {
                VariationID: this.req.params.variation_id,
                Value: this.req.body.Value
            } as VariationValueSchema.CreateVariationValueSchema;
            return;
        }
        if (this.type === "GetOneVariationValueSchema") {
            this.schema = VariationValueSchema.GetOneVariationValueSchema;
            this.data = {
                ID: this.req.params.variationvalue_id,
                VariationID: this.req.params.variation_id,
            } as VariationValueSchema.GetOneVariationValueSchema;
            return;
        }
        if (this.type === "GetListVariationValueSchema") {
            this.schema = VariationValueSchema.GetListVariationValueSchema;
            this.data = {
                VariationID: this.req.params.variation_id,
            } as VariationValueSchema.GetListVariationValueSchema;
            return;
        }
        if (this.type === "UpdateVariationValueSchema") {
            this.schema = VariationValueSchema.UpdateVariationValueSchema;
            this.data = {
                VariationID: this.req.params.variation_id,
                ID: this.req.params.variationvalue_id,
                Value: this.req.body.Value
            } as VariationValueSchema.UpdateVariationValueSchema;
            return;
        }
        if (this.type === "DeleteVariationValueSchema") {
            this.schema = VariationValueSchema.DeleteVariationValueSchema;
            this.data = {
                VariationID: this.req.params.variation_id,
                ID: this.req.params.variationvalue_id
            } as VariationValueSchema.DeleteVariationValueSchema;
            return;
        }

        // VariationValueGroup
        if (this.type === "CreateVariationValueGroupSchema") {
            this.schema = VariationValueGroupSchema.CreateVariationValueGroupSchema;
            this.data = {
                ProductID: this.req.params.product_id,
                ItemID: this.req.params.item_id,
                VariationValueID: this.req.body.variationvalue_id
            } as VariationValueGroupSchema.CreateVariationValueGroupSchema;
            return;
        }
        if (this.type === "GetListVariationValueGroupSchema") {
            this.schema = VariationValueGroupSchema.GetListVariationValueGroupSchema;
            this.data = {
                ProductID: this.req.params.product_id,
                ItemID: this.req.params.item_id
            } as VariationValueGroupSchema.GetListVariationValueGroupSchema;
            return;
        }
        if (this.type === "DeleteVariationValueGroupSchema") {
            this.schema = VariationValueGroupSchema.DeleteVariationValueGroupSchema;
            this.data = {
                ProductID: this.req.params.product_id,
                ItemID: this.req.params.item_id,
                VariationValueID: this.req.params.variation_id
            } as VariationValueGroupSchema.DeleteVariationValueGroupSchema;
            return;
        }

        // Item
        if (this.type === "CreateItemSchema") {
            this.schema = ItemSchema.CreateItemSchema;
            this.data = {
                ProductID: this.req.params.product_id,
                Stock: this.req.body.Stock,
                Price: this.req.body.Price
            } as ItemSchema.CreateItemSchema;
            return;
        }
        if (this.type === "GetOneItemSchema") {
            this.schema = ItemSchema.GetOneItemSchema;
            this.data = {
                ID: this.req.params.item_id,
                ProductID: this.req.params.product_id,
            } as ItemSchema.GetOneItemSchema;
            return;
        }
        if (this.type === "GetListItemSchema") {
            this.schema = ItemSchema.GetListItemSchema;
            this.data = {
                ProductID: this.req.params.product_id,
            } as ItemSchema.GetListItemSchema;
            return;
        }
        if (this.type === "UpdateItemSchema") {
            this.schema = ItemSchema.UpdateItemSchema;
            this.data = {
                ProductID: this.req.params.product_id,
                ID: this.req.params.item_id,
                Stock: this.req.body.Value,
                Price: this.req.body.Price
            } as ItemSchema.UpdateItemSchema;
            return;
        }
        if (this.type === "DeleteItemSchema") {
            this.schema = ItemSchema.DeleteItemSchema;
            this.data = {
                ProductID: this.req.params.product_id,
                ID: this.req.params.item_id
            } as ItemSchema.DeleteItemSchema;
            return;
        }
    }
}