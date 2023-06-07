import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute, ForeignKey } from "sequelize";
import { User } from "./user";

export enum Role {
    Administrator = "Administrator",
    Customer = "Customer",
    Shipper = "Shipper"
}

export enum Table {
    ALL = "all",
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

export class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
    declare UserID: ForeignKey<string>;
    declare Role: Role;
    declare Table: Table;
    declare CRUD: CRUD

    public static defindPermission(sequelize: Sequelize): NonAttribute<typeof Permission> {
        if (sequelize.models.Permission === Permission) return Permission;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            Role: {
                type: DataTypes.ENUM({
                    values: Object.values(Role)
                }),
                primaryKey: true,
                defaultValue: Role.Customer
            },
            Table: {
                type: DataTypes.ENUM({
                    values: Object.values(Table),
                }),
                primaryKey: true,
                defaultValue: Table.ALL
            },
            CRUD: {
                type: DataTypes.ENUM({
                    values: Object.values(CRUD),
                }),
                allowNull: false,
                defaultValue: CRUD.All
            }
        }, {
            sequelize,
            modelName: "Permission",
            timestamps: false
        });

        return Permission
    }

    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Permission != Permission) return false;

        if (sequelize.models.User != User) return false;

        Permission.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
}