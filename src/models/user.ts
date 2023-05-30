import {Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize";
import { Permission } from "./permission";
import { Verification } from "./verification";
import { PASSWORD_LENGTH, SALT_LENGTH } from "../contant";

export enum Gender {
    Other = "Other",
    Male = "Male",
    Female = "Female"
}

export enum Status {
    Unavailable = "Unavailable",
    Available = "Available",
    Locked = "Locked"
}

export enum Type {
    Administrator = "Administrator",
    Customer = "Customer",
    Shipper = "Shipper"
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare ID: CreationOptional<string>;
    declare Username: string;
    declare FullName: string | null;
    declare Email: string;
    declare Gender: CreationOptional<Gender>;
    declare Birthday: CreationOptional<Date>;
    declare Password: string;
    declare Salt: string; // Is Used for password hash
    declare Status: CreationOptional<Status>;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;
    declare DeletedAt: CreationOptional<Date | null>;

    public static defineUser(sequelize: Sequelize): NonAttribute<typeof User> {

        if (sequelize.models.User === User) return User;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            Username: {
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true
            },
            FullName: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            Email: {
                type: DataTypes.STRING(200),
                unique: true,
                allowNull: false
            },
            Password: {
                type: DataTypes.STRING(PASSWORD_LENGTH),
                allowNull: false
            },
            Salt: {
                type: DataTypes.STRING(SALT_LENGTH),
                allowNull: false
            },
            Gender: {
                type: DataTypes.ENUM({
                    values: Object.values(Gender)
                }),
                defaultValue: Gender.Other
            },
            Birthday: {
                type: DataTypes.DATE,
                allowNull: true
            },
            Status: {
                type: DataTypes.ENUM({
                    values: Object.values(Status)
                }),
                defaultValue: Status.Unavailable
            },

            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE,
            DeletedAt: DataTypes.DATE
        }, {
            sequelize,
            modelName: 'User',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
            deletedAt: 'DeletedAt',
        });

        return User;
    }

    public static associatePermission(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Permission != Permission) return false;

        User.hasMany(Permission, {foreignKey: "UserID", sourceKey: "ID"});

        return true;
    }

    public static associateVerification(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Verification != Verification) return false;

        User.hasMany(Verification, {foreignKey: "UserID", sourceKey: "ID"});

        return true;
    }
}