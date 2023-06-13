import { Router } from "express";

import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import ProductController from "../../controllers/admin/product.controller";
import { Validate } from "../../middlewares/validate.middleware";
import { GeneralSchema, ProductSchema } from "../../validator/validate";
import { CRUD, Role, Table } from "../../models/permission";

const product_router = Router();

product_router.use(Authentication)

product_router.get('/',
    Authorization(Role.Administrator, [{ Table: Table.product, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name.PaginationSchema),
    ProductController.GetProducts
)

product_router.get('/:product_id',
    Authorization(Role.Administrator, [{ Table: Table.product, CRUD: CRUD.OnlyRead }]),
    Validate(ProductSchema.Name.GetOneProductSchema),
    ProductController.GetProduct
)

product_router.post('/',
    Authorization(Role.Administrator, [{ Table: Table.product, CRUD: CRUD.OnlyCreate }]),
    Validate(ProductSchema.Name.CreateProductSchema),
    ProductController.CreateProduct
)

product_router.put('/:product_id',
    Authorization(Role.Administrator, [{ Table: Table.product, CRUD: CRUD.OnlyUpdate }]),
    Validate(ProductSchema.Name.UpdateProductSchema),
    ProductController.UpdateProduct
)

product_router.delete('/:product_id',
    Authorization(Role.Administrator, [{ Table: Table.product, CRUD: CRUD.OnlyDelete }]),
    Validate(ProductSchema.Name.DeleteProductSchema),
    ProductController.DeleteProduct
)

export default product_router;