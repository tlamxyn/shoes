import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Item } from "./item";
import { VariationValue } from "./variationvalue";

export class VariationValueGroup extends Model<InferAttributes<VariationValueGroup>, InferCreationAttributes<VariationValueGroup>> {
    declare ItemID: ForeignKey<string>;
    declare VariationValueID: ForeignKey<string>;

    declare item: NonAttribute<Item>;
    declare variationvalue: NonAttribute<VariationValue>;

    declare static associations: {
        item: Association<VariationValueGroup, Item>,
        variationvalue: Association<VariationValueGroup, VariationValue>;
    }

    public static defineVariationValueGroup(sequelize: Sequelize): NonAttribute<typeof VariationValueGroup> {

        if (sequelize.models.VariationValueGroup === VariationValueGroup) return VariationValueGroup;

        this.init({
            ItemID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            VariationValueID: {
                type: DataTypes.UUID,
                primaryKey: true
            }
        }, {
            sequelize,
            modelName: 'VariationValueGroup',
            timestamps: false,
        });

        return VariationValueGroup;
    }

    public static associateItem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.VariationValueGroup != VariationValueGroup) return false;

        if (sequelize.models.Item != Item) return false;

        VariationValueGroup.belongsTo(Item, {foreignKey: "ItemID", as: "item"});

        return true;
    }

    public static associateVariationValue(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.VariationValueGroup != VariationValueGroup) return false;

        if (sequelize.models.VariationValue != VariationValue) return false;

        VariationValueGroup.belongsTo(VariationValue, {foreignKey: "VariationValueID", as: "variationvalue"});

        return true;
    }
}