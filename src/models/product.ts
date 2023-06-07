import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare ID: CreationOptional<String>;
    declare Name: String;
    declare Description: String;
    declare ProductTypeID: ForeignKey<String>;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;
    declare DeletedAt: CreationOptional<Date | null>;

    public static defineProduct(sequelize: Sequelize): NonAttribute<typeof Product> {

        if (sequelize.models.Product === Product) return Product;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ProductTypeID: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE,
            DeletedAt: DataTypes.DATE
        }, {
            sequelize,
            modelName: 'Product',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
            deletedAt: 'DeletedAt',
        });

        return Product;
    }
}