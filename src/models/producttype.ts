import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Product } from "./product";

export class ProductType extends Model<InferAttributes<ProductType>, InferCreationAttributes<ProductType>> {
    declare ID: CreationOptional<String>
    declare Name: String;

    public static defineProductType(sequelize: Sequelize): NonAttribute<typeof ProductType> {

        if (sequelize.models.ProductType === ProductType) return ProductType;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'ProductType',
            timestamps: false,
        });

        return ProductType;
    }
}