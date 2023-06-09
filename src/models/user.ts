import {
    Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional,
    NonAttribute, Association
} from "sequelize";
import { Permission } from "./permission";
import { Verification } from "./verification";
import { Address } from "./address";
import { PASSWORD_LENGTH, SALT_LENGTH } from "../contant";
import { SecretKey } from "./secretkey";
import { UserNotification } from "./usernotification";
import { Problem } from "./problem";
import { Review } from "./review";
import { Favorite } from "./favorite";
import { Invoice } from "./invoice";
import { ShipWork } from "./shipwork";
import { Cart } from "./cart";

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

    //

    // Can be used by add 'include' relation in query
    declare permissions: NonAttribute<Permission[]>;
    declare verification: NonAttribute<Verification>;
    declare addresses: NonAttribute<Address[]>;
    declare tokens: NonAttribute<SecretKey[]>;
    declare usernotifications: NonAttribute<UserNotification[]>;
    declare problems: NonAttribute<Problem[]>;
    declare reviews: NonAttribute<Review[]>;
    declare favorites: NonAttribute<Favorite[]>;
    declare invoices: NonAttribute<Invoice[]>;
    declare shipworks: NonAttribute<ShipWork[]>;
    declare carts: NonAttribute<Cart[]>;

    declare static associations: {
        permissions: Association<User, Permission>,
        verification: Association<User, Verification>,
        addresses: Association<User, Address>,
        tokens: Association<User, SecretKey>,
        usernotifications: Association<User, UserNotification>,
        problems: Association<User, Problem>,
        reviews: Association<User, Review>,
        favorites: Association<User, Favorite>,
        invoices: Association<User, Invoice>,
        shipworks: Association<User, ShipWork>,
        carts: Association<User, Cart>
    };

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

        User.hasMany(Permission, { foreignKey: "UserID", sourceKey: "ID", as: "permissions" });

        return true;
    }

    public static associateVerification(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Verification != Verification) return false;

        User.hasOne(Verification, { foreignKey: "UserID", sourceKey: "ID", as: "verification"});

        return true;
    }

    public static associateSecretKey(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.SecretKey != SecretKey) return false;

        User.hasMany(SecretKey, { foreignKey: "UserID", sourceKey: "ID", as: "secretkeys" });

        return true;
    }
    public static associateAddress(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Address != Address) return false;

        User.hasMany(Address, { foreignKey: "UserID", sourceKey: "ID", as: "addresses" });

        return true;
    }
    public static associateUserNotification(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.UserNotification != UserNotification) return false;

        User.hasMany(UserNotification, { foreignKey: "UserID", sourceKey: "ID", as: "usernotifications" });

        return true;
    }
    public static associateCart(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Cart != Cart) return false;

        User.hasMany(Cart, { foreignKey: "UserID", sourceKey: "ID", as: "carts" });

        return true;
    }
    public static associateShipWork(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.ShipWork != ShipWork) return false;

        User.hasMany(ShipWork, { foreignKey: "UserID", sourceKey: "ID", as: "shipworks" });

        return true;
    }
    public static associateInvoice(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Invoice != Invoice) return false;

        User.hasMany(Invoice, { foreignKey: "UserID", sourceKey: "ID", as: "invoices" });

        return true;
    }
    public static associateFavorite(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Favorite != Favorite) return false;

        User.hasMany(Favorite, { foreignKey: "UserID", sourceKey: "ID", as: "favorites" });

        return true;
    }
    public static associateReview(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Review != Review) return false;

        User.hasMany(Review, { foreignKey: "UserID", sourceKey: "ID", as: "reviews" });

        return true;
    }
    public static associateProblem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.Problem != Problem) return false;

        User.hasMany(Problem, { foreignKey: "UserID", sourceKey: "ID", as: "problems" });

        return true;
    }
}