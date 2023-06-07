import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

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

    public static defineInvoice(sequelize: Sequelize): NonAttribute<typeof Invoice> {

        if (sequelize.models.Invoice === Invoice) return Invoice;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
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
}