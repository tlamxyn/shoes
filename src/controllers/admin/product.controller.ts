import { Request, Response } from "express";
import { BadRequest, InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { GeneralSchema, ProductSchema as MainSchema } from "../../validator/validate";
import { Product } from "../../models/product";
import { MySQL } from "../../database/database";
import { ProductType } from "../../models/producttype";

export default class ProductController {
    public static async GetProducts(req: Request, res: Response) {
        try {
            const pagination: GeneralSchema.PaginationSchema = res.locals.PaginationSchema;
            const products = await Product.findAll({
                limit: pagination.limit,
                offset: pagination.limit * (pagination.page - 1)
            });
            return OK(res, { data: products });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async GetProduct(req: Request, res: Response) {
        try {
            const { ID }: MainSchema.GetOneProductSchema = res.locals.GetOneProductSchema;
            const product = await Product.findOne({ where: { ID: ID } });

            if (!product) {
                return NotFound(res, {});
            }
            return OK(res, { data: product });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async CreateProduct(req: Request, res: Response) {
        const {
            Name,
            Description,
            ProductTypeID
        }: MainSchema.CreateProductSchema = res.locals.CreateProductSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {
            const searchName = await Product.findOne({ where: { Name: Name } })
            if (searchName) {
                await transaction.rollback();
                return BadRequest(res, { message: "Name Existed" })
            }

            const searchProductTypeID = await ProductType.findOne({ where: { ID: ProductTypeID } });
            if (!searchProductTypeID) {
                await transaction.rollback();
                return BadRequest(res, { message: "ProductType Not Existed" })
            }

            const createdProductType = await Product.create({
                Name: Name,
                ProductTypeID: ProductTypeID,
                Description: Description
            }, { transaction: transaction });
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
    public static async UpdateProduct(req: Request, res: Response) {
        const {
            ID,
            ProductTypeID,
            Name,
            Description
        }: MainSchema.UpdateProductSchema = res.locals.UpdateProductSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {

            const product = await Product.findOne({ where: { ID: ID } });
            if (!product) {
                await transaction.rollback();
                return NotFound(res, { message: "Product not existed" });
            }

            const producttype = await ProductType.findOne({ where: { ID: ProductTypeID } });
            if (!producttype) {
                await transaction.rollback();
                return NotFound(res, { message: "ProductType not existed" })
            }

            const searchName = await Product.findOne({ where: { Name: Name } });
            if (!searchName) {
                await transaction.rollback();
                return BadRequest(res, { message: "Name existed" })
            }

            const result = await product!.update({
                Name: Name,
                Description: Description,
                ProductTypeID: producttype.ID
            }, { transaction: transaction })
            if (!result) {
                await transaction.rollback();
                return InternalServerError(res, {});
            }

            await transaction.commit();
            return OK(res);
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async DeleteProduct(req: Request, res: Response) {
        const { ID }: MainSchema.DeleteProductSchema = res.locals.DeleteProductSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {
            const product = await Product.findOne({ where: { ID: ID } });

            if (!product) {
                await transaction.rollback();
                return NotFound(res, {});
            }
            await product.destroy({ transaction: transaction });

            await transaction.commit();
            return OK(res, { message: "Deleted" });
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}