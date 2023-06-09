import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Review } from "./review";
import { User } from "./user";
import { InvoiceDetail } from "./invoicedetail";
import { ShipWork } from "./shipwork";

export enum Status {
    Waiting = "Waiting",
    Checking = "Checking",
    Delivering = "Delivering",
    Completed = "Completed",
    Canceled = "Canceled"
}

export class Invoice extends Model<InferAttributes<Invoice>, InferCreationAttributes<Invoice>> {
    declare ID: CreationOptional<string>;
    declare UserID: ForeignKey<string>;
    declare Status: CreationOptional<Status>;
    declare IsImportInvoice: CreationOptional<boolean>;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;
    declare DeletedAt: CreationOptional<Date>;

    declare user: NonAttribute<User>;
    declare reviews: NonAttribute<Review>;
    declare invoicedetails: NonAttribute<InvoiceDetail>;
    declare shipworks: NonAttribute<ShipWork>;

    declare static associations: {
        user: Association<Invoice, User>,
        reviews: Association<Invoice, Review>,
        invoicedetails: Association<Invoice, InvoiceDetail>,
        shipworks: Association<Invoice, ShipWork>
    }

    public static defineInvoice(sequelize: Sequelize): NonAttribute<typeof Invoice> {

        if (sequelize.models.Invoice === Invoice) return Invoice;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            UserID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Status: {
                type: DataTypes.ENUM({
                    values: Object.values(Status)
                }),
                allowNull: false,
                defaultValue: Status.Waiting
            },
            IsImportInvoice: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE,
            DeletedAt: DataTypes.DATE
        }, {
            sequelize,
            modelName: 'Invoice',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
            deletedAt: 'DeletedAt',
        });

        return Invoice;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Invoice != Invoice) return false;

        if (sequelize.models.User != User) return false;

        Invoice.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
    public static associateInvoiceDetail(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Invoice != Invoice) return false;

        if (sequelize.models.InvoiceDetail != InvoiceDetail) return false;

        Invoice.hasMany(InvoiceDetail, { foreignKey: "InvoiceID", sourceKey: "ID", as: "invoicedetails" });

        return true;
    }
    public static associateReview(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Invoice != Invoice) return false;

        if (sequelize.models.Review != Review) return false;

        Invoice.hasMany(Review, { foreignKey: "InvoiceID", sourceKey: "ID", as: "reviews" });

        return true;
    }
    public static associateShipWork(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Invoice != Invoice) return false;

        if (sequelize.models.ShipWork != ShipWork) return false;

        Invoice.hasOne(ShipWork, { foreignKey: "InvoiceID", sourceKey: "ID", as: "shipworks" });

        return true;
    }
}