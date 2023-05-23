import { InferCreationAttributes } from "sequelize";
import { CRUD, Permission, Role, Table } from "../../models/permission";

export const permissions: InferCreationAttributes<Permission>[] = [{
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8665",
    Role: Role.Administrator,
    Table: Table.ALL,
    CRUD: CRUD.All
}, {
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8665",
    Role: Role.Customer,
    Table: Table.ALL,
    CRUD: CRUD.All
}, {
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8664",
    Role: Role.Customer,
    Table: Table.ALL,
    CRUD: CRUD.All
}, {
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8663",
    Role: Role.Customer,
    Table: Table.ALL,
    CRUD: CRUD.All
}, {
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8663",
    Role: Role.Shipper,
    Table: Table.ALL,
    CRUD: CRUD.All
}, {
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8662",
    Role: Role.Customer,
    Table: Table.ALL,
    CRUD: CRUD.All
}, {
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8662",
    Role: Role.Administrator,
    Table: Table.user,
    CRUD: CRUD.All
}, {
    UserID: "650e5335-f88e-11ed-af84-d8d0903a8662",
    Role: Role.Administrator,
    Table: Table.permission,
    CRUD: CRUD.All
},]