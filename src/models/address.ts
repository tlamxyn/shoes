import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute, ForeignKey, CreationOptional } from "sequelize";

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    declare UserID: CreationOptional<ForeignKey<string>>;

    declare Name: string;

    declare Detail: string;

    declare Phone: string;

    public static defineAddress(sequelize: Sequelize): NonAttribute<typeof Address> {

        if (sequelize.models.Address === Address) return Address;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Name: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Detail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Phone: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Address',
            timestamps: false,
        });

        return Address;
    }
}