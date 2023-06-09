import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Invoice } from "./invoice";
import { Item } from "./item";

export class InvoiceDetail extends Model<InferAttributes<InvoiceDetail>, InferCreationAttributes<InvoiceDetail>> {
    declare InvoiceID: ForeignKey<string>;
    declare ItemID: ForeignKey<string>;
    declare Price: number;
    declare Quantity: number;
    declare DiscountID: CreationOptional<ForeignKey<string> | null>;

    declare invoice: NonAttribute<Invoice>;
    declare item: NonAttribute<Item>;

    declare static associations: {
        invoice: Association<InvoiceDetail, Invoice>,
        item: Association<InvoiceDetail, Item>
    }

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
    public static associateInvoice(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.InvoiceDetail != InvoiceDetail) return false;

        if (sequelize.models.Invoice != Invoice) return false;

        InvoiceDetail.belongsTo(Invoice, { foreignKey: "InvoiceID", as: "invoice" });

        return true;
    }
    public static associateItem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.InvoiceDetail != InvoiceDetail) return false;

        if (sequelize.models.Item != Item) return false;

        InvoiceDetail.belongsTo(Item, { foreignKey: "ItemID", as: "item" });

        return true;
    }
}