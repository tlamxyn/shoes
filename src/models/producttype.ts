import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Product } from "./product";

export class ProductType extends Model<InferAttributes<ProductType>, InferCreationAttributes<ProductType>> {
    declare ID: CreationOptional<string>
    declare Name: string;

    declare products: NonAttribute<Product[]>;

    declare static associations: {
        products: Association<ProductType, Product>
    }

    public static defineProductType(sequelize: Sequelize): NonAttribute<typeof ProductType> {

        if (sequelize.models.ProductType === ProductType) return ProductType;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
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

    public static associateProduct(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.ProductType != ProductType) return false;

        if (sequelize.models.Product != Product) return false;

        ProductType.hasMany(Product, { foreignKey: "ProductTypeID", sourceKey: "ID", as: "products" });

        return true;
    }
}