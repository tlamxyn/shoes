import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

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
}