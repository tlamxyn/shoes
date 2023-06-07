import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export enum Type {
    Color = "Color",
    Text = "Text",
    Number = "Number"
}

export class Variation extends Model<InferAttributes<Variation>, InferCreationAttributes<Variation>> {
    declare ID: CreationOptional<string>;
    declare Name: string;
    declare Type: Type;

    public static defineVariation(sequelize: Sequelize): NonAttribute<typeof Variation> {

        if (sequelize.models.Variation === Variation) return Variation;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
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
}