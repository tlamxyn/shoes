import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Image } from "./image";
import { Product } from "./product";
import { Invoice } from "./invoice";
import { User } from "./user";

export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    declare UserID: ForeignKey<string>;
    declare ProductID: ForeignKey<string>;
    declare InvoiceID: ForeignKey<string>;
    declare Content: string;
    declare Star: number;
    declare CreatedAt: CreationOptional<Date>;

    declare images: NonAttribute<Image[]>;
    declare product: NonAttribute<Product>;
    declare invoice: NonAttribute<Invoice>;
    declare user: NonAttribute<User>;

    declare static associations: {
        images: Association<Review, Image>,
        product: Association<Review, Product>,
        invoice: Association<Review, Invoice>,
        user: Association<Review, User>
    }

    public static defineReview(sequelize: Sequelize): NonAttribute<typeof Review> {

        if (sequelize.models.Review === Review) return Review;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ProductID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            InvoiceID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Star: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },
            CreatedAt: DataTypes.DATE,
        }, {
            sequelize,
            modelName: 'Review',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: false,
            deletedAt: false,
        });

        return Review;
    }
    public static associateProduct(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Review != Review) return false;

        if (sequelize.models.Product != Product) return false;

        Review.belongsTo(Product, { foreignKey: "ProductID", as: "product" });

        return true;
    }
    public static associateInvoice(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Review != Review) return false;

        if (sequelize.models.Invoice != Invoice) return false;

        Review.belongsTo(Invoice, { foreignKey: "InvoiceID", as: "invoice" });

        return true;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Review != Review) return false;

        if (sequelize.models.User != User) return false;

        Review.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
    public static associateImage(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Review != Review) return false;

        if (sequelize.models.Image != Image) return false;

        Review.hasMany(Image, { foreignKey: "OwnerID", sourceKey: "ID", as: "images" });

        return true;
    }
}