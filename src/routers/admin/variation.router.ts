import { Router } from "express";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import { Validate } from "../../middlewares/validate.middleware";
import { CRUD, Role, Table } from "../../models/permission";
import VariationController from "../../controllers/admin/variation.controller";
import { GeneralSchema, VariationSchema } from "../../validator/validate";

const variation_router = Router();

variation_router.use(Authentication)

variation_router.get('/',
    Authorization(Role.Administrator, [{ Table: Table.variation, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name[GeneralSchema.Name.PaginationSchema]),
    VariationController.GetVariations
)

variation_router.get('/:variation_id',
    Authorization(Role.Administrator, [{ Table: Table.variation, CRUD: CRUD.OnlyRead }]),
    Validate(VariationSchema.Name[VariationSchema.Name.GetOneVariationSchema]),
    VariationController.GetVariation
)

variation_router.post('/',
    Authorization(Role.Administrator, [{ Table: Table.variation, CRUD: CRUD.OnlyCreate }]),
    Validate(VariationSchema.Name[VariationSchema.Name.CreateVariationSchema]),
    VariationController.CreateVariation
)

variation_router.put('/:variation_id',
    Authorization(Role.Administrator, [{ Table: Table.variation, CRUD: CRUD.OnlyUpdate }]),
    Validate(VariationSchema.Name[VariationSchema.Name.UpdateVariationSchema]),
    VariationController.UpdateVariation
)

variation_router.delete('/:variation_id',
    Authorization(Role.Administrator, [{ Table: Table.variation, CRUD: CRUD.OnlyDelete }]),
    Validate(VariationSchema.Name[VariationSchema.Name.DeleteVariationSchema]),
    VariationController.DeleteVariation
)

export default variation_router;