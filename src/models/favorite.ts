import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Favorite extends Model<InferAttributes<Favorite>, InferCreationAttributes<Favorite>> {
    declare UserID: ForeignKey<string>;
    declare ProductID: ForeignKey<string>;

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
}