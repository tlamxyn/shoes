import { Router } from "express";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import { Validate } from "../../middlewares/validate.middleware";
import { CRUD, Role, Table } from "../../models/permission";
import { VariationValueGroupController } from "../../controllers/admin/controller";
import { GeneralSchema, VariationValueGroupSchema } from "../../validator/validate";

const variationvaluegroup_router = Router({ mergeParams: true });

variationvaluegroup_router.use(Authentication)

variationvaluegroup_router.get('/',
    Authorization(Role.Administrator, [{ Table: Table.variationvaluegroup, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name.PaginationSchema),
    Validate(VariationValueGroupSchema.Name.GetListVariationValueGroupSchema),
    VariationValueGroupController.GetVariationValueGroups
)

variationvaluegroup_router.post('/',
    Authorization(Role.Administrator, [{ Table: Table.variationvaluegroup, CRUD: CRUD.OnlyCreate }]),
    Validate(VariationValueGroupSchema.Name.CreateVariationValueGroupSchema),
    VariationValueGroupController.CreateVariationValueGroup
)

variationvaluegroup_router.delete('/:variationvalue_id',
    Authorization(Role.Administrator, [{ Table: Table.variationvaluegroup, CRUD: CRUD.OnlyDelete }]),
    Validate(VariationValueGroupSchema.Name.DeleteVariationValueGroupSchema),
    VariationValueGroupController.DeleteVariationValueGroup
)

export default variationvaluegroup_router;