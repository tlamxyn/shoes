import { Association, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Item } from "./item";
import { Discount } from "./discount";

export class DiscountItem extends Model<InferAttributes<DiscountItem>, InferCreationAttributes<DiscountItem>> {

    declare ItemID: ForeignKey<string>;
    declare DiscountID: ForeignKey<string>;

    declare item: NonAttribute<Item>;
    declare discount: NonAttribute<Discount>;

    declare static associations: {
        item: Association<DiscountItem, Item>,
        discount: Association<DiscountItem, Discount>
    }

    public static defineDiscountItem(sequelize: Sequelize): NonAttribute<typeof DiscountItem> {

        if (sequelize.models.DiscountItem === DiscountItem) return DiscountItem;

        this.init({
            ItemID: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            DiscountID: {
                type: DataTypes.UUID,
                primaryKey: true
            }
        }, {
            sequelize,
            modelName: 'DiscountItem',
            timestamps: false,
        });

        return DiscountItem;
    }
    public static associateItem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.DiscountItem != DiscountItem) return false;

        if (sequelize.models.Item != Item) return false;

        DiscountItem.belongsTo(Item, { foreignKey: "ItemID", as: "item" });

        return true;
    }
    public static associateDiscount(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.DiscountItem != DiscountItem) return false;

        if (sequelize.models.Discount != Discount) return false;

        DiscountItem.belongsTo(Discount, { foreignKey: "DiscountID", as: "discount" });

        return true;
    }
}