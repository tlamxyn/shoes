import { Model, Sequelize, DataTypes, Optional } from "sequelize";

export enum Role {
    Administrator = "Administrator",
    Customer = "Customer",
    Shipper = "Shipper"
}

export enum Table {
    user = "user",
    permission = "permission",
}

export enum CRUD {
    OnlyCreate = "1000",
    OnlyRead = "0100",
    OnlyUpdate = "0010",
    OnlyDelete = "0001",
    All = "1111",
    CreateRead = "1100",
    CreateUpdate = "1010",
    CreateDelete = "1001",
    ReadUpdate = "0110",
    ReadDelete = "0101",
    UpdateDelete = "0011",
    CreateReadUpdate = "1110",
    CreateReadDelete = "1101",
    CreateUpdateDelete = "1011",
    ReadUpdateDelete = "0111"

}

export type PermissionAttributes = {
    UserID: string,
    Role: Role,
    Table: Table,
    CRUD: CRUD
}

export type PermissionCreationAttributes = Optional<PermissionAttributes, 'UserID'>

export class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> {
    declare UserID: string;
    declare Role: Role;
    declare Table: Table;
    declare CRUD: CRUD

    public static defindPermission(sequelize: Sequelize) {
        if(sequelize.models.Permission === Permission) return Permission;

        this.init({
            UserID: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            Role: {
                type: DataTypes.ENUM({
                    values: Object.values(Role)
                }),
                defaultValue: Role.Customer
            },
            Table: {
                type: DataTypes.ENUM({
                    values: Object.values(Table)
                }),
            },
            CRUD: {
                type: DataTypes.ENUM({
                    values: Object.values(CRUD)
                }),
                defaultValue: CRUD.All
            }
        }, {
            sequelize: sequelize,
            modelName: "Permission",
        });

        return Permission
    }
}