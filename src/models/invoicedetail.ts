import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class InvoiceDetail extends Model<InferAttributes<InvoiceDetail>, InferCreationAttributes<InvoiceDetail>> {
    declare InvoiceID: ForeignKey<string>;
    declare ItemID: ForeignKey<string>;
    declare Price: number;
    declare Quantity: number;
    declare DiscountID: CreationOptional<ForeignKey<string> | null>;


    public static defineInvoiceDetail(sequelize: Sequelize): NonAttribute<typeof InvoiceDetail> {

        if (sequelize.models.InvoiceDetail === InvoiceDetail) return InvoiceDetail;

        this.init({
            InvoiceID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ItemID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Price: {
                type: DataTypes.DOUBLE.UNSIGNED,
                allowNull: false
            },
            Quantity: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            sequelize,
            modelName: 'InvoiceDetail',
            timestamps: false,
        });

        return InvoiceDetail;
    }
}