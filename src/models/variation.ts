import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { VariationValue } from "./variationvalue";

export enum Type {
    Color = "Color",
    Text = "Text",
    Number = "Number"
}

export class Variation extends Model<InferAttributes<Variation>, InferCreationAttributes<Variation>> {
    declare ID: CreationOptional<string>;
    declare Name: string;
    declare Type: Type;

    declare variationvalues: NonAttribute<VariationValue[]>;

    declare static associations: {
        variationvalues: Association<Variation, VariationValue>
    };

    public static defineVariation(sequelize: Sequelize): NonAttribute<typeof Variation> {

        if (sequelize.models.Variation === Variation) return Variation;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Type: {
                type: DataTypes.ENUM({
                    values: Object.values(Type)
                }),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Variation',
            timestamps: false,
        });

        return Variation;
    }

    public static associateVariationValue(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Variation != Variation) return false;

        if (sequelize.models.VariationValue != VariationValue) return false;

        Variation.hasMany(VariationValue, { foreignKey: "VariationID", sourceKey: "ID", as: "variationvalues" });

        return true;
    }
}