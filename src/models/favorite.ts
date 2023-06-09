import { Association, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { User } from "./user";
import { Product } from "./product";

export class Favorite extends Model<InferAttributes<Favorite>, InferCreationAttributes<Favorite>> {
    declare UserID: ForeignKey<string>;
    declare ProductID: ForeignKey<string>;

    declare user: NonAttribute<User>;
    declare product: NonAttribute<Product>;

    declare static associations: {
        user: Association<Favorite, User>,
        product: Association<Favorite, Product>
    }

    public static defineFavorite(sequelize: Sequelize): NonAttribute<typeof Favorite> {

        if (sequelize.models.Favorite === Favorite) return Favorite;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ProductID: {
                type: DataTypes.UUID,
                primaryKey: true
            }
        }, {
            sequelize,
            modelName: 'Favorite',
            timestamps: false
        });

        return Favorite;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Favorite != Favorite) return false;

        if (sequelize.models.User != User) return false;

        Favorite.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
    public static associateProduct(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Favorite != Favorite) return false;

        if (sequelize.models.Product != Product) return false;

        Favorite.belongsTo(Product, { foreignKey: "ProductID", as: "product" });

        return true;
    }
}