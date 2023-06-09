import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Invoice } from "./invoice";
import { User } from "./user";

export enum Status {
    Shipping = "Shipping",
    Completed = "Completed",
    Canceled = "Canceled"
}

export class ShipWork extends Model<InferAttributes<ShipWork>, InferCreationAttributes<ShipWork>> {
    declare UserID: ForeignKey<string>;
    declare InvoiceID: ForeignKey<string>;
    declare Status: Status;
    declare CreatedAt: CreationOptional<string>;
    declare UpdatedAt: CreationOptional<string>;
    declare DeletedAt: CreationOptional<string>;

    declare user: NonAttribute<User>;
    declare invoice: NonAttribute<Invoice>;

    declare static associations: {
        user: Association<ShipWork, User>,
        invoice: Association<ShipWork, Invoice>
    }

    public static defineShipWork(sequelize: Sequelize): NonAttribute<typeof ShipWork> {

        if (sequelize.models.ShipWork === ShipWork) return ShipWork;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            InvoiceID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Status: {
                type: DataTypes.ENUM({
                    values: Object.values(Status)
                }),
                defaultValue: Status.Shipping,
                allowNull: false,
            },
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE,
            DeletedAt: DataTypes.DATE
        }, {
            sequelize,
            modelName: 'ShipWork',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
            deletedAt: 'DeletedAt',
        });

        return ShipWork;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.ShipWork != ShipWork) return false;

        if (sequelize.models.User != User) return false;

        ShipWork.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
    public static associateInvoice(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.ShipWork != ShipWork) return false;

        if (sequelize.models.Invoice != Invoice) return false;

        ShipWork.belongsTo(Invoice, { foreignKey: "InvoiceID", as: "invoice" });

        return true;
    }
}