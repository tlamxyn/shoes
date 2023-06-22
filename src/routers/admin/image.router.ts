import { Router } from "express";

import AuthController from "../../controllers/auth.controller";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import ImageController from "../../controllers/admin/image.controller";
import { UploadImages, UploadImage } from "../../middlewares/file.middleware";
import { Validate } from "../../middlewares/validate.middleware";
import { ImageSchema } from "../../validator/validate";
import { CRUD, Role, Table } from "../../models/permission";

const image_router = Router({ mergeParams: true });

image_router.post("/single",
    Authorization(Role.Administrator, [{ Table: Table.image, CRUD: CRUD.OnlyCreate }]),
    UploadImage,
    Validate(ImageSchema.Name.CreateImageSchema),
    ImageController.UploadImage
)

image_router.post("/multi",
    Authorization(Role.Administrator, [{ Table: Table.image, CRUD: CRUD.OnlyCreate }]),
    UploadImages,
    Validate(ImageSchema.Name.CreateImagesSchema),
    ImageController.UploadImages
)

export default image_router;