import { Router } from "express";

import { Authentication, Authorization } from "../../middlewares/auth.middleware";

import { ProductTypeController } from "../../controllers/admin/controller";
import { CRUD, Role, Table } from "../../models/permission";

const producttype_router = Router();

producttype_router.use(Authentication)

producttype_router.get('/',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyRead }]),
    ProductTypeController.GetProductTypes
)

producttype_router.get('/:producttype_id',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyRead }]),
    ProductTypeController.GetProductType
)

producttype_router.post('/',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyCreate }]),
    ProductTypeController.CreateProductType
)

producttype_router.put('/',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyUpdate }]),
    ProductTypeController.UpdateProductType
)

producttype_router.delete('/',
    Authorization(Role.Customer, [{ Table: Table.producttype, CRUD: CRUD.OnlyDelete }]),
    ProductTypeController.DeleteProductType
)
export default producttype_router;