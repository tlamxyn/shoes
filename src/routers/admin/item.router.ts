import { Router } from "express";

import { Authentication, Authorization } from "../../middlewares/auth.middleware";
import { ItemController } from "../../controllers/admin/controller";
import { Validate } from "../../middlewares/validate.middleware";
import { GeneralSchema, ItemSchema } from "../../validator/validate";
import { CRUD, Role, Table } from "../../models/permission";

const item_router = Router();

item_router.use(Authentication)

item_router.get('/',
    Authorization(Role.Administrator, [{ Table: Table.item, CRUD: CRUD.OnlyRead }]),
    Validate(GeneralSchema.Name.PaginationSchema),
    Validate(ItemSchema.Name.GetListItemSchema),
    ItemController.GetItems
)

item_router.get('/:product_id',
    Authorization(Role.Administrator, [{ Table: Table.item, CRUD: CRUD.OnlyRead }]),
    Validate(ItemSchema.Name.GetOneItemSchema),
    ItemController.GetItem
)

item_router.post('/',
    Authorization(Role.Administrator, [{ Table: Table.item, CRUD: CRUD.OnlyCreate }]),
    Validate(ItemSchema.Name.CreateItemSchema),
    ItemController.CreateItem
)

item_router.put('/:product_id',
    Authorization(Role.Administrator, [{ Table: Table.item, CRUD: CRUD.OnlyUpdate }]),
    Validate(ItemSchema.Name.UpdateItemSchema),
    ItemController.UpdateItem
)

item_router.delete('/:product_id',
    Authorization(Role.Administrator, [{ Table: Table.item, CRUD: CRUD.OnlyDelete }]),
    Validate(ItemSchema.Name.DeleteItemSchema),
    ItemController.DeleteItem
)

export default item_router;