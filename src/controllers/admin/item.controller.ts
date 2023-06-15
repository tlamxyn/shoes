import { Request, Response } from "express";
import { BadRequest, InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { GeneralSchema, ItemSchema as MainSchema } from "../../validator/validate";
import { Item } from "../../models/item";
import { MySQL } from "../../database/database";
import { ProductType } from "../../models/producttype";
import { Product } from "../../models/product";
import { generateSKU } from "../../utils/sku";

export default class ItemController {
    public static async GetItems(req: Request, res: Response) {
        try {
            const pagination: GeneralSchema.PaginationSchema = res.locals.PaginationSchema;
            const { ProductID }: MainSchema.GetListItemSchema = res.locals.GetListItemSchema;

            const product = await Product.findOne({ where: { ID: ProductID } });
            if (!product) {
                return NotFound(res, {});
            }

            const items = await Item.findAll({
                where: {
                    ProductID: ProductID
                },
                limit: pagination.limit,
                offset: pagination.limit * (pagination.page - 1)
            })
            return OK(res, { data: items });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async GetItem(req: Request, res: Response) {
        try {
            const { ID, ProductID }: MainSchema.GetOneItemSchema = res.locals.GetOneItemSchema;

            const product = await Product.findOne({ where: { ID: ProductID } });
            if (!product) {
                return NotFound(res, {});
            }

            const item = await Item.findOne({ where: { ID: ID } });
            if (!item) {
                return NotFound(res, {});
            }

            return OK(res, { data: item });
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async CreateItem(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { ProductID, Stock, Price }: MainSchema.CreateItemSchema = res.locals.CreateItemSchema;
        try {
            const product = await Product.findOne({ where: { ID: ProductID } });
            if (!product) {
                return NotFound(res, {});
            }

            const producttype = await ProductType.findOne({ where: { ID: product.ProductTypeID } });
            if (!producttype) {
                return NotFound(res, {});
            }

            const new_item = Item.build({
                ProductID: ProductID,
                Stock: Stock,
                Price: Price,
                SKU: ""
            });
            new_item.SKU = generateSKU(new_item.ID, producttype.Name);
            await new_item.save({ transaction: transaction });

            await transaction.commit();
            return OK(res);
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async UpdateItem(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { ID, ProductID, Stock, Price }: MainSchema.UpdateItemSchema = res.locals.UpdateItemSchema;
        try {
            const item = await Item.findOne({ where: { ID: ID } });
            if (!item) {
                return NotFound(res, {});
            }

            const product = await Product.findOne({ where: { ID: ProductID } });
            if (!product) {
                return NotFound(res, {});
            }

            await item.update({ Stock: Stock, Price: Price }, { transaction: transaction });

            await transaction.commit();
            return OK(res);
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async DeleteItem(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { ID, ProductID }: MainSchema.DeleteItemSchema = res.locals.DeleteItemSchema;
        try {
            const product = await Product.findOne({ where: { ID: ProductID } });
            if (!product) {
                return NotFound(res, {});
            }

            const item = await Item.findOne({ where: { ID: ID } });
            if (!item) {
                return NotFound(res, {});
            }

            await item.destroy({ transaction: transaction });

            await transaction.commit();
            return OK(res);
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}