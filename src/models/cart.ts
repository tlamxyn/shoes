import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    declare ItemID: ForeignKey<string>;

    declare UserID: ForeignKey<string>;

    declare Quantity: number;

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

}