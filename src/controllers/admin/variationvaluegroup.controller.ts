import { Request, Response } from "express";
import { GeneralSchema, VariationValueGroupSchema as MainSchema } from "../../validator/validate"
import { MySQL } from "../../database/database";
import { BadRequest, InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { Variation } from "../../models/variation";
import { VariationValueGroup } from "../../models/variationvaluegroup";
import { Op } from "sequelize";
import { Product } from "../../models/product";
import { Item } from "../../models/item";
import { VariationValue } from "../../models/variationvalue";

export default class VariationValueGroupController {
    public static async GetVariationValueGroups(req: Request, res: Response) {
        try {
            const pagination: GeneralSchema.PaginationSchema = res.locals.PaginationSchema;
            const { ProductID, ItemID }: MainSchema.GetListVariationValueGroupSchema = res.locals.GetListVariationValueGroupSchema;

            const item = await Item.findOne({
                where: {
                    [Op.and]: {
                        ID: ItemID,
                        ProductID: ProductID
                    }
                }
            })
            if (!item) {
                return NotFound(res, {});
            }

            const variationvaluegroups = await VariationValueGroup.findAll({
                where: {
                    ItemID: ItemID
                },
                limit: pagination.limit,
                offset: pagination.limit * (pagination.page - 1)
            })

            return OK(res, { data: variationvaluegroups })
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }

    public static async CreateVariationValueGroup(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { ProductID, ItemID, VariationValueID }: MainSchema.CreateVariationValueGroupSchema = res.locals.CreateVariationValueGroupSchema;
        try {
            const item = await Item.findOne({
                where: {
                    [Op.and]: {
                        ID: ItemID,
                        ProductID: ProductID
                    }
                }
            })
            if (!item) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            const variationvalue = await VariationValue.findOne({ where: { ID: VariationValueID } });
            if (!variationvalue) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            const createdVariationValueGroup = await VariationValueGroup.create({
                VariationValueID: VariationValueID,
                ItemID: ItemID
            })
            if (!createdVariationValueGroup) {
                await transaction.rollback();
                return InternalServerError(res, {});
            }

            await transaction.commit();
            return OK(res, { data: createdVariationValueGroup })
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }

    public static async DeleteVariationValueGroup(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { ProductID, ItemID, VariationValueID }: MainSchema.DeleteVariationValueGroupSchema = res.locals.DeleteVariationValueGroupSchema;
        try {
            const item = await Item.findOne({
                where: {
                    [Op.and]: {
                        ID: ItemID,
                        ProductID: ProductID
                    }
                }
            })
            if (!item) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            const variationvaluegroup = await VariationValueGroup.findOne({
                where: {
                    [Op.and]: {
                        VariationValueID: VariationValueID,
                        ItemID: ItemID
                    }
                }
            })
            if (!variationvaluegroup) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            await variationvaluegroup.destroy();

            await transaction.commit();
            return OK(res, { message: "Deleted" })
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}