import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Variation } from "./variation";
import { VariationValueGroup } from "./variationvaluegroup";

export class VariationValue extends Model<InferAttributes<VariationValue>, InferCreationAttributes<VariationValue>> {
    declare ID: CreationOptional<string>;
    declare VariationID: ForeignKey<string>;
    declare Value: string;

    declare variation: NonAttribute<Variation>;
    declare variationvaluegroups: NonAttribute<VariationValueGroup[]>

    declare static associations: {
        variation: Association<VariationValue, Variation>,
        variationvaluegroups: Association<VariationValue, VariationValueGroup>
    }

    public static defineVariationValue(sequelize: Sequelize): NonAttribute<typeof VariationValue> {

        if (sequelize.models.VariationValue === VariationValue) return VariationValue;

        this.init({
            ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
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

    public static associateVariation(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.VariationValue != VariationValue) return false;

        if (sequelize.models.Variation != Variation) return false;

        VariationValue.belongsTo(Variation, {foreignKey: "VariationID", as: "variation"});

        return true;
    }

    public static associateVariationValueGroup(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.VariationValue != VariationValue) return false;

        if (sequelize.models.VariationValueGroup != VariationValueGroup) return false;

        VariationValue.hasMany(VariationValueGroup, { foreignKey: "VariationValueID", sourceKey: "ID", as: "variationvaluegroups" });

        return true;
    }
}