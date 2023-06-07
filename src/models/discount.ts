import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Discount extends Model<InferAttributes<Discount>, InferCreationAttributes<Discount>> {
    declare ID: CreationOptional<string>;
    declare Discount: number;
    declare EventID: CreationOptional<ForeignKey<string> | null>;

    public static defineDiscount(sequelize: Sequelize): NonAttribute<typeof Discount> {

        if (sequelize.models.Discount === Discount) return Discount;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            Discount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            },
            EventID: {
                type: DataTypes.UUID,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Discount',
            timestamps: false,
        });

        return Discount;
    }
}