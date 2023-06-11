import { Request, Response } from "express";
import { ProductType } from "../../models/producttype";
import { BadRequest, InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { MySQL } from "../../database/database";
import { GeneralSchema, ProductTypeSchema as MainSchema } from "../../validator/validate"
export default class ProductTypeController {
    public static async GetProductTypes(req: Request, res: Response): Promise<Response> {
        try {
            const pagination: GeneralSchema.PaginationSchema = res.locals.PaginationSchema;
            const producttypes = await ProductType.findAll({
                limit: pagination.limit, 
                offset: pagination.limit * (pagination.page - 1)
            });
            return OK(res, { data: producttypes });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async GetProductType(req: Request, res: Response): Promise<Response> {
        try {
            const { ID }: MainSchema.GetOneProductTypeSchema = res.locals.GetOneProductTypeSchema;
            const producttype = await ProductType.findOne({ where: { ID: ID } });

            if (!producttype) {
                return NotFound(res, {});
            }
            return OK(res, { data: producttype });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async CreateProductType(req: Request, res: Response): Promise<Response> {
        const { Name }: MainSchema.CreateProductTypeSchema = res.locals.CreateProductTypeSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {
            if (!Name) {
                await transaction.rollback();
                return BadRequest(res, { message: "Lacking of parameters" })
            }
            const search = await ProductType.findOne({ where: { Name: Name } })
            if (search) {
                await transaction.rollback();
                return BadRequest(res, { message: "It Existed" })
            }
            const createdProductType = await ProductType.create({ Name: Name }, { transaction: transaction });
            if (!createdProductType) {
                await transaction.rollback();
                return InternalServerError(res, {});
            }
            await transaction.commit();
            return OK(res, { data: createdProductType })
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }

    }
    public static async UpdateProductType(req: Request, res: Response): Promise<Response> {
        const { ID, Name }: MainSchema.UpdateProductTypeSchema = res.locals.UpdateProductTypeSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {

            await transaction.commit();
            return OK(res, { data: null });
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async DeleteProductType(req: Request, res: Response): Promise<Response> {
        const ID = req.params.producttype_id ?? null;
        const transaction = await MySQL.sequelize!.transaction();
        try {
            const producttype = await ProductType.findOne({ where: { ID: ID } });

            if (!producttype) {
                await transaction.rollback();
                return NotFound(res, {});
            }
            await producttype.destroy({ transaction: transaction });
            let check = await ProductType.findOne({ where: { ID: ID } });
            if (check) {
                await transaction.rollback();
                return InternalServerError(res, {});
            }
            await transaction.commit();
            return OK(res, { message: "Deleted" });
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}