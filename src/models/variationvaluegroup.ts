import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class VariationValueGroup extends Model<InferAttributes<VariationValueGroup>, InferCreationAttributes<VariationValueGroup>> {
    declare ItemID: ForeignKey<string>;
    declare VariationValueID: ForeignKey<string>;

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
}