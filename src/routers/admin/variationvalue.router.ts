import { Router } from "express";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import { Validate } from "../../middlewares/validate.middleware";
import { CRUD, Role, Table } from "../../models/permission";
import VariationValueController from "../../controllers/admin/variationvalue.controller";
import { GeneralSchema, VariationValueSchema } from "../../validator/validate";

const variationvalue_router = Router({ mergeParams: true });

variationvalue_router.use(Authentication)

variationvalue_router.get('/',
    Authorization(Role.Administrator, [{ Table: Table.variationvalue, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name.PaginationSchema),
    Validate(VariationValueSchema.Name.GetListVariationValueSchema),
    VariationValueController.GetVariationValues
)

variationvalue_router.get('/:variationvalue_id',
    Authorization(Role.Administrator, [{ Table: Table.variationvalue, CRUD: CRUD.OnlyRead }]),
    Validate(VariationValueSchema.Name.GetOneVariationValueSchema),
    VariationValueController.GetVariationValue
)

variationvalue_router.post('/',
    Authorization(Role.Administrator, [{ Table: Table.variationvalue, CRUD: CRUD.OnlyCreate }]),
    Validate(VariationValueSchema.Name.CreateVariationValueSchema),
    VariationValueController.CreateVariationValue
)

variationvalue_router.put('/:variationvalue_id',
    Authorization(Role.Administrator, [{ Table: Table.variationvalue, CRUD: CRUD.OnlyUpdate }]),
    Validate(VariationValueSchema.Name.UpdateVariationValueSchema),
    VariationValueController.UpdateVariationValue
)

variationvalue_router.delete('/:variationvalue_id',
    Authorization(Role.Administrator, [{ Table: Table.variationvalue, CRUD: CRUD.OnlyDelete }]),
    Validate(VariationValueSchema.Name.DeleteVariationValueSchema),
    VariationValueController.DeleteVariationValue
)

export default variationvalue_router;