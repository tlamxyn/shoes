import { Association, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { User } from "./user";
import { Item } from "./item";

export class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    declare ItemID: ForeignKey<string>;

    declare UserID: ForeignKey<string>;

    declare Quantity: number;

    declare user: NonAttribute<User>;
    declare item: NonAttribute<Item>;

    declare static associations: {
        user: Association<Cart, User>,
        item: Association<Cart, Item>
    }

    public static defineCart(sequelize: Sequelize): NonAttribute<typeof Cart> {

        if (sequelize.models.Cart === Cart) return Cart;

        this.init({
            ItemID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
        }, {
            sequelize,
            modelName: 'Cart',
            timestamps: false,
        });

        return Cart;
    }
    public static associateItem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Cart != Cart) return false;

        if (sequelize.models.Item != Item) return false;

        Cart.belongsTo(Item, { foreignKey: "ItemID", as: "item" });

        return true;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.User != User) return false;

        if (sequelize.models.User != User) return false;

        User.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
}