import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ProductType } from "./producttype";
import { Image } from "./image";
import { Review } from "./review";
import { Favorite } from "./favorite";
import { Item } from "./item";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare ID: CreationOptional<string>;
    declare Name: string;
    declare Description: string;
    declare ProductTypeID: ForeignKey<string>;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;
    declare DeletedAt: CreationOptional<Date | null>;

    declare producttype: NonAttribute<ProductType>;
    declare images: NonAttribute<Image[]>;
    declare reviews: NonAttribute<Review[]>;
    declare favorite: NonAttribute<Favorite[]>;
    declare items: NonAttribute<Item[]>;

    declare static associations: {
        producttype: Association<Product, ProductType>,
        images: Association<Product, Image>,
        reviews: Association<Product, Review>,
        favorite: Association<Product, Favorite>,
        items: Association<Product, Item>
    }

    public static defineProduct(sequelize: Sequelize): NonAttribute<typeof Product> {

        if (sequelize.models.Product === Product) return Product;

        this.init({
            ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
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
    public static associateProductType(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Product != Product) return false;

        if (sequelize.models.ProductType != ProductType) return false;

        Product.belongsTo(ProductType, { foreignKey: "ProductTypeID", as: "producttype" });

        return true;
    }
    public static associateImage(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Product != Product) return false;

        if (sequelize.models.Image != Image) return false;

        Product.hasMany(Image, { foreignKey: "OwnerID", sourceKey: "ID", as: "images" });

        return true;
    }
    public static associateReview(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Product != Product) return false;

        if (sequelize.models.Review != Review) return false;

        Product.hasMany(Review, { foreignKey: "ProductID", sourceKey: "ID", as: "reviews" });

        return true;
    }
    public static associateFavorite(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Product != Product) return false;

        if (sequelize.models.Favorite != Favorite) return false;

        Product.hasMany(Favorite, { foreignKey: "ProductID", sourceKey: "ID", as: "favorites" });

        return true;
    }
    public static associateItem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Product != Product) return false;

        if (sequelize.models.Item != Item) return false;

        Product.hasMany(Item, { foreignKey: "ProductID", sourceKey: "ID", as: "items" });

        return true;
    }
}