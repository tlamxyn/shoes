import { CreateOptions, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Product } from "./product";

export class ProductType extends Model<InferAttributes<ProductType>, InferCreationAttributes<ProductType>> {
    declare ID: CreateOptions<String>
    declare Name: String;

    public static defineProductType(sequelize: Sequelize): NonAttribute<typeof ProductType> {

        if (sequelize.models.ProductType === ProductType) return ProductType;

        this.init({
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Name: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'ProductType',
        });

        return ProductType;
    }

    public static associateProduct(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.ProductType != ProductType) return false;

        if (sequelize.models.Product != Product) return false;

        ProductType.hasMany(Product, {foreignKey: "ProductTypeID", sourceKey: 'ID'});

        return true;
    }
}