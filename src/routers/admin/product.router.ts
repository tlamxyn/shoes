import { Router } from "express";

import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import ProductController from "../../controllers/admin/product.controller";
import { Validate } from "../../middlewares/validate.middleware";
import { GeneralSchema, } from "../../validator/validate";
import { CRUD, Role, Table } from "../../models/permission";

const product_router = Router();

product_router.use(Authentication)

product_router.get('/',
    Authorization(Role.Administrator, [{ Table: Table.product, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name[GeneralSchema.Name.PaginationSchema]),
    ProductController.GetProducts
)

product_router.get('/product_id',
    Authorization(Role.Administrator, [{ Table: Table.product, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name[GeneralSchema.Name.PaginationSchema]),
    ProductController.GetProduct
)

export default product_router;