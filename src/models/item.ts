import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Product } from "./product";
import { VariationValueGroup } from "./variationvaluegroup";
import { DiscountItem } from "./discountitem";
import { InvoiceDetail } from "./invoicedetail";
import { Cart } from "./cart";

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    declare ID: CreationOptional<string>;
    declare ProductID: ForeignKey<string>;
    declare Stock: number;
    declare Price: number;
    declare SKU: string;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;
    declare DeletedAt: CreationOptional<Date | null>;

    declare product: NonAttribute<Product>;
    declare variationvaluegroups: NonAttribute<VariationValueGroup[]>;
    declare discountitems: NonAttribute<DiscountItem[]>;
    declare invoicedetails: NonAttribute<InvoiceDetail[]>;
    declare carts: NonAttribute<Cart[]>;

    declare static associations: {
        product: Association<Item, Product>,
        variationvaluegroups: Association<Item, VariationValueGroup>,
        discountitems: Association<Item, DiscountItem>,
        invoicedetails: Association<Item, InvoiceDetail>,
        carts: Association<Item, Cart>
    }

    public static defineItem(sequelize: Sequelize): NonAttribute<typeof Item> {

        if (sequelize.models.Item === Item) return Item;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ProductID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Stock: {
                type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
                allowNull: false,
                defaultValue: 0
            },
            Price: {
                type: DataTypes.DOUBLE.UNSIGNED.ZEROFILL,
                allowNull: false,
                defaultValue: 0
            },
            SKU: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE,
            DeletedAt: DataTypes.DATE
        }, {
            sequelize,
            modelName: 'Item',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
            deletedAt: 'DeletedAt',
        });

        return Item;
    }
    public static associateProduct(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Item != Item) return false;

        if (sequelize.models.Product != Product) return false;

        Item.belongsTo(Product, { foreignKey: "ProductID", as: "product" });

        return true;
    }
    public static associateVariationValueGroup(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Item != Item) return false;

        if (sequelize.models.VariationValueGroup != VariationValueGroup) return false;

        Item.hasMany(VariationValueGroup, { foreignKey: "ItemID", sourceKey: "ID", as: "variationvaluegroups" });

        return true;
    }
    public static associateDiscountItem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Item != Item) return false;

        if (sequelize.models.DiscountItem != DiscountItem) return false;

        Item.hasMany(DiscountItem, { foreignKey: "ItemID", sourceKey: "ID", as: "discountitems" });

        return true;
    }
    public static associateInvoiceDetail(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Item != Item) return false;

        if (sequelize.models.InvoiceDetail != InvoiceDetail) return false;

        Item.hasMany(InvoiceDetail, { foreignKey: "ItemID", sourceKey: "ID", as: "invoicedetail" });

        return true;
    }
    public static associateCart(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Item != Item) return false;

        if (sequelize.models.Cart != Cart) return false;

        Item.hasMany(Cart, { foreignKey: "ItemID", sourceKey: "ID", as: "carts" });

        return true;
    }

}