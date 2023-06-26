import { Request, Response } from "express";
import { InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { GeneralSchema, ProductSchema as MainSchema } from "../../validator/validate";
import { Product } from "../../models/product";

export default class ProductController {
    public static async GetList(req: Request, res: Response) {
        try {
            const pagination: GeneralSchema.PaginationSchema = res.locals.PaginationSchema;
            const products = await Product.findAll({
                include: [{
                    association: Product.associations.items,
                    required: true,
                    right: true
                }, {
                    association: Product.associations.producttype,
                }, {
                    association: Product.associations.images
                }, {
                    association: Product.associations.reviews
                }],
                limit: pagination.limit,
                offset: pagination.limit * (pagination.page - 1)
            });
            return OK(res, { data: products });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async GetOne(req: Request, res: Response) {
        try {
            const { ID }: MainSchema.GetOneProductSchema = res.locals.GetOneProductSchema;
            const product = await Product.findOne({
                where: {
                    ID: ID
                },
                include: [{
                    association: Product.associations.items,
                    required: true,
                    right: true
                }, {
                    association: Product.associations.producttype,
                }, {
                    association: Product.associations.images
                }, {
                    association: Product.associations.reviews
                }],
            });

            if (!product) {
                return NotFound(res, {});
            }
            return OK(res, { data: product });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}