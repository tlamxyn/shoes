import { Router } from "express";

import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import ProductController from "../../controllers/customer/product.controller";
import { CRUD, Role, Table } from "../../models/permission";
import { Validate } from "../../middlewares/validate.middleware";
import { GeneralSchema, ProductSchema } from "../../validator/validate";

const product_router = Router();

product_router.use(Authentication);

product_router.get("/",
    Authorization(Role.Customer, [{ Table: Table.product, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name.PaginationSchema),
    ProductController.GetList
);

product_router.get("/:product_id",
    Authorization(Role.Customer, [{ Table: Table.product, CRUD: CRUD.OnlyRead }]),
    Validate(ProductSchema.Name.GetOneProductSchema),
    ProductController.GetOne
);

export default product_router;