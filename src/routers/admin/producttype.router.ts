import { Router } from "express";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import { ProductTypeController } from "../../controllers/admin/controller";
import { CRUD, Role, Table } from "../../models/permission";
import { Validate } from "../../middlewares/validate.middleware";
import { ProductTypeSchema, GeneralSchema } from "../../validator/validate";

const producttype_router = Router();

producttype_router.use(Authentication)

producttype_router.get('/',
    Authorization(Role.Administrator, [{ Table: Table.producttype, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name.PaginationSchema),
    ProductTypeController.GetProductTypes
)

producttype_router.get('/:producttype_id',
    Authorization(Role.Administrator, [{ Table: Table.producttype, CRUD: CRUD.OnlyRead }]),
    Validate(ProductTypeSchema.Name.GetOneProductTypeSchema),
    ProductTypeController.GetProductType
)

producttype_router.post('/',
    Authorization(Role.Administrator, [{ Table: Table.producttype, CRUD: CRUD.OnlyCreate }]),
    Validate(ProductTypeSchema.Name.CreateProductTypeSchema),
    ProductTypeController.CreateProductType
)

producttype_router.put('/:producttype_id',
    Authorization(Role.Administrator, [{ Table: Table.producttype, CRUD: CRUD.OnlyUpdate }]),
    Validate(ProductTypeSchema.Name.UpdateProductTypeSchema),
    ProductTypeController.UpdateProductType
)

producttype_router.delete('/:producttype_id',
    Authorization(Role.Administrator, [{ Table: Table.producttype, CRUD: CRUD.OnlyDelete }]),
    Validate(ProductTypeSchema.Name.DeleteProductTypeSchema),
    ProductTypeController.DeleteProductType
)
export default producttype_router;