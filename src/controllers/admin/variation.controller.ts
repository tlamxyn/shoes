import { Request, Response } from "express";
import { GeneralSchema, VariationSchema as MainSchema } from "../../validator/validate"
import { MySQL } from "../../database/database";
import { BadRequest, InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { Variation } from "../../models/variation";
import { Op } from "sequelize";

export default class VariationController {
    public static async GetVariations(req: Request, res: Response) {
        try {
            const pagination: GeneralSchema.PaginationSchema = res.locals.PaginationSchema;
            const variations = await Variation.findAll({
                limit: pagination.limit,
                offset: pagination.limit * (pagination.page - 1)
            })
            return OK(res, { data: variations })
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async GetVariation(req: Request, res: Response) {
        try {
            const { ID }: MainSchema.GetOneVariationSchema = res.locals.GetOneVariationSchema;
            const variation = await Variation.findOne({ where: { ID: ID } });

            if (!variation) {
                return NotFound(res, {});
            }
            return OK(res, { data: variation })
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async CreateVariation(req: Request, res: Response) {
        const { Name, Type }: MainSchema.CreateVariationSchema = res.locals.CreateVariationSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {
            const search = await Variation.findOne({ where: { Name: Name } })
            if (search) {
                await transaction.rollback();
                return BadRequest(res, { message: "It Existed" })
            }
            const createdVariation = await Variation.create({ Name: Name, Type: Type }, { transaction: transaction });
            if (!createdVariation) {
                await transaction.rollback();
                return InternalServerError(res, {});
            }
            await transaction.commit();
            return OK(res, { data: createdVariation });
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async UpdateVariation(req: Request, res: Response) {
        const { ID, Name, Type }: MainSchema.UpdateVariationSchema = res.locals.UpdateVariationSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {
            const variation = await Variation.findOne({ where: { ID: ID } });
            if (!variation) {
                await transaction.rollback();
                return NotFound(res, {});
            }
            const result = await variation!.update({ Name: Name, Type: Type }, { transaction: transaction })
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
    public static async DeleteVariation(req: Request, res: Response) {
        const { ID }: MainSchema.DeleteVariationSchema = res.locals.DeleteVariationSchema;
        const transaction = await MySQL.sequelize!.transaction();
        try {
            const variation = await Variation.findOne({ where: { ID: ID } });

            if (!variation) {
                await transaction.rollback();
                return NotFound(res, {});
            }
            await variation.destroy({ transaction: transaction });

            await transaction.commit();
            return OK(res, { message: "Deleted" });
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
}