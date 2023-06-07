import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class VariationValue extends Model<InferAttributes<VariationValue>, InferCreationAttributes<VariationValue>> {
    declare ID: CreationOptional<string>;
    declare VariationID: ForeignKey<string>;
    declare Value: string;

    public static defineVariationValue(sequelize: Sequelize): NonAttribute<typeof VariationValue> {

        if (sequelize.models.VariationValue === VariationValue) return VariationValue;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            VariationID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Value: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'VariationValue',
            timestamps: false,
        });

        return VariationValue;
    }
}