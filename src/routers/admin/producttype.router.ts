import { Router } from "express";

import { Authentication, Authorization } from "../../middlewares/auth.middleware";

import { ProductTypeController } from "../../controllers/admin/controller";
import { CRUD, Role, Table } from "../../models/permission";
import { Validate } from "../../middlewares/validate.middleware";

const producttype_router = Router();

producttype_router.use(Authentication)

producttype_router.get('/',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyRead }]),
    Validate("PaginationSchema"),
    ProductTypeController.GetProductTypes
)

producttype_router.get('/:producttype_id',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyRead }]),
    Validate("GetOneProductTypeSchema"),
    ProductTypeController.GetProductType
)

producttype_router.post('/',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyCreate }]),
    Validate("CreateProductTypeSchema"),
    ProductTypeController.CreateProductType
)

producttype_router.put('/:producttype_id',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyUpdate }]),
    Validate("UpdateProductTypeSchema"),
    ProductTypeController.UpdateProductType
)

producttype_router.delete('/:producttype_id',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyDelete }]),
    Validate("DeleteProductTypeSchema"),
    ProductTypeController.DeleteProductType
)
export default producttype_router;