import { Request, Response } from "express";
import fs from "fs/promises"
import { MySQL } from "../../database/database";
import { BadRequest, InternalServerError, NotFound, OK } from "../../services/response_content/response_content";
import { GeneralSchema, ImageSchema as MainSchema } from "../../validator/validate";
import { Image, Table as ImageTable } from "../../models/image";
import { isImageExtension, saveImage, getTable, generateImageName, deleteImage } from "../../utils/image";
import { randomDigitByTime } from "../../utils/random";
import path from "path";
import { Op } from "sequelize";

export default class ImageController {
    public static async UploadImages(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { OwnerID, Table, images }: MainSchema.CreateImagesSchema = res.locals.CreateImagesSchema;
        try {
            const Owner = getTable(Table)
            if (!Object.keys(ImageTable).includes(Table) || !Owner) {
                await transaction.rollback();
                return NotFound(res, { message: "Sai Table" })
            }

            const owner_id = await (Owner as any)["findOne"]({ where: { ID: OwnerID } })
            if (!owner_id) {
                await transaction.rollback();
                return NotFound(res, {})
            }

            if (!images) {
                await transaction.rollback();
                return BadRequest(res, { message: "Không thấy ảnh" })
            };

            // Check extension
            let checktype = (images! as Express.Multer.File[])
                .every(f => isImageExtension(f.originalname));
            if (!checktype) {
                await transaction.rollback();
                return BadRequest(res, { message: "Sai extension" });
            }

            // Create Image Instances
            let imageInstances = Image.bulkBuild((images as []).map(i => {
                return {
                    OwnerID: OwnerID,
                    Table: ImageTable[Table],
                    Name: ""
                }
            }))

            // Update Name of Image
            imageInstances = imageInstances.map((i, index) => {
                i.Name = generateImageName(i.ID, (images as Express.Multer.File[])[index].originalname)
                return i;
            })

            // Store image info to database
            await Promise.all(imageInstances.map(async (item) => {
                await item.save({ transaction: transaction });
            }))

            // Store image buffer to file
            await Promise.all(imageInstances.map(async (image) => {
                await saveImage(image.Name, (req.files as unknown as Express.Multer.File[])[0].buffer);
            }))

            await transaction.commit();
            return OK(res, { data: imageInstances });
        } catch (error) {
            await transaction.rollback()
            return InternalServerError(res, { message: (error as Error).message ?? undefined })
        }
    }
    public static async UploadImage(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { OwnerID, Table, image }: MainSchema.CreateImageSchema = res.locals.CreateImageSchema;
        try {
            const Owner = getTable(Table)
            if (!Object.keys(ImageTable).includes(Table) || !Owner) {
                await transaction.rollback();
                return NotFound(res, { message: "Sai Table" })
            }

            const owner_id = await (Owner as any)["findOne"]({ where: { ID: OwnerID } })
            if (!owner_id) {
                await transaction.rollback();
                return NotFound(res, { message: "Owner không tồn tại" })
            }

            if (!image) {
                await transaction.rollback();
                return BadRequest(res, { message: "Không thấy ảnh" })
            };
            // Check extension
            let checktype = isImageExtension((image as Express.Multer.File).originalname);
            if (!checktype) {
                await transaction.rollback();
                return BadRequest(res, { message: "Sai extension" });
            }

            // Create Image Instances
            let imageInstance = Image.build({
                OwnerID: OwnerID,
                Table: ImageTable[Table],
                Name: ""
            })

            // Update Name of Image
            imageInstance.Name = generateImageName(imageInstance.ID, (image as Express.Multer.File).originalname)

            // Store image info to database
            await imageInstance.save({ transaction: transaction });

            // Store image buffer to file
            await saveImage(imageInstance.Name, (req.file as unknown as Express.Multer.File).buffer);

            await transaction.commit();
            return OK(res, { data: imageInstance })
        } catch (error) {
            await transaction.rollback()
            console.log(error)
            return InternalServerError(res, { message: (error as Error).message ?? undefined })
        }
    }
    public static async DeleteImage(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { OwnerID, Table, ID }: MainSchema.DeleteImageSchema = res.locals.DeleteImageSchema;
        try {
            const Owner = getTable(Table)
            if (!Object.keys(ImageTable).includes(Table) || !Owner) {
                await transaction.rollback();
                return NotFound(res, { message: "Sai Table" })
            }

            const owner_id = await (Owner as any)["findOne"]({ where: { ID: OwnerID } })
            if (!owner_id) {
                await transaction.rollback();
                return NotFound(res, { message: "Owner không tồn tại" })
            }

            const image = await Image.findOne({
                where: {
                    ID: ID
                }
            })
            if (!image) {
                await transaction.rollback();
                return NotFound(res, { message: "Image không tồn tại" })
            }

            // Delete Image Record in Database
            await image.destroy({ transaction: transaction });

            // Delete Image in folder
            await deleteImage(image.Name);

            await transaction.commit();
            return OK(res);
        } catch (error) {
            await transaction.rollback()
            console.log(error)
            return InternalServerError(res, { message: (error as Error).message ?? undefined })
        }
    }
    public static async DeleteImagesOfOwner(req: Request, res: Response) {
        const transaction = await MySQL.sequelize!.transaction();
        const { OwnerID, Table }: MainSchema.DeleteOwnerImagesSchema = res.locals.DeleteOwnerImagesSchema;
        try {
            const Owner = getTable(Table)
            if (!Object.keys(ImageTable).includes(Table) || !Owner) {
                await transaction.rollback();
                return NotFound(res, { message: "Sai Table" })
            }

            const owner_id = await (Owner as any)["findOne"]({ where: { ID: OwnerID } })
            if (!owner_id) {
                await transaction.rollback();
                return NotFound(res, { message: "Owner không tồn tại" })
            }

            const images = await Image.findAll({
                where: {
                    [Op.and]: {
                        Table: Table,
                        OwnerID: OwnerID
                    }
                }
            })
            if (!images) {
                await transaction.rollback();
                return NotFound(res, { message: "Image không tồn tại" })
            }

            // Delete Image Record in Database
            await Promise.all(images.map(async image => {
                await image.destroy({ transaction: transaction });
            }));

            // Delete Image in folder
            await Promise.all(images.map(async image => {
                await deleteImage(image.Name);
            }))

            await transaction.commit();
            return OK(res);
        } catch (error) {
            await transaction.rollback()
            console.log(error)
            return InternalServerError(res, { message: (error as Error).message ?? undefined })
        }
    }
}