import { Request, Response } from "express";
import { GeneralSchema, VariationValueSchema as MainSchema } from "../../validator/validate"
import { MySQL } from "../../database/database";
import { BadRequest, InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { Variation } from "../../models/variation";
import { VariationValue } from "../../models/variationvalue";
import { Op } from "sequelize";

export default class VariationValueController {
    public static async GetVariationValues(req: Request, res: Response) {
        try {
            const pagination: GeneralSchema.PaginationSchema = res.locals.PaginationSchema;
            const { VariationID }: MainSchema.GetListVariationValueSchema = res.locals.GetListVariationValueSchema;

            const variation = await Variation.findOne({ where: { ID: VariationID } })
            if (!variation) {
                return NotFound(res, {});
            }

            const variationvalues = await VariationValue.findAll({
                where: {
                    VariationID: VariationID
                },
                limit: pagination.limit,
                offset: pagination.limit * (pagination.page - 1)
            })

            return OK(res, { data: variationvalues })
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async GetVariationValue(req: Request, res: Response) {
        try {
            const { VariationID, ID }: MainSchema.GetOneVariationValueSchema = res.locals.GetOneVariationValueSchema;

            const variation = await Variation.findOne({ where: { ID: VariationID } })
            if (!variation) {
                return NotFound(res, {});
            }

            const variationvalue = await VariationValue.findOne({ where: { ID: ID } })
            if (!variationvalue) {
                return NotFound(res, {});
            }

            return OK(res, { data: variationvalue })
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async CreateVariationValue(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { VariationID, Value }: MainSchema.CreateVariationValueSchema = res.locals.CreateVariationValueSchema;
        try {
            const variation = await Variation.findOne({ where: { ID: VariationID } })
            if (!variation) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            const createdVariationValue = await VariationValue.create({
                VariationID: VariationID,
                Value: Value
            })
            if (!createdVariationValue) {
                await transaction.rollback();
                return InternalServerError(res, {});
            }

            await transaction.commit();
            return OK(res, { data: createdVariationValue })
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async UpdateVariationValue(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { VariationID, ID, Value }: MainSchema.UpdateVariationValueSchema = res.locals.UpdateVariationValueSchema;
        try {
            const variation = await Variation.findOne({ where: { ID: VariationID } })
            if (!variation) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            const variationvalue = await VariationValue.findOne({
                where: {
                    [Op.and]: {
                        ID: ID,
                        VariationID: VariationID
                    }
                }
            })
            if (!variationvalue) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            const result = await variationvalue.update({ Value: Value }, { transaction: transaction })
            if (!result) {
                await transaction.rollback();
                return InternalServerError(res, {});
            }

            await transaction.commit();
            return OK(res)
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async DeleteVariationValue(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { VariationID, ID }: MainSchema.DeleteVariationValueSchema = res.locals.DeleteVariationValueSchema;
        try {
            const variation = await Variation.findOne({ where: { ID: VariationID } })
            if (!variation) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            const variationvalue = await VariationValue.findOne({
                where: {
                    [Op.and]: {
                        ID: ID,
                        VariationID: VariationID
                    }
                }
            })
            if (!variationvalue) {
                await transaction.rollback();
                return NotFound(res, {});
            }

            await variationvalue.destroy();

            await transaction.commit();
            return OK(res, { message: "Deleted" })
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}