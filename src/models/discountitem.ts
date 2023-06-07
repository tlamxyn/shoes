import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class DiscountItem extends Model<InferAttributes<DiscountItem>, InferCreationAttributes<DiscountItem>> {

    declare ItemID: ForeignKey<string>;
    declare DiscountID: ForeignKey<string>;

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
}