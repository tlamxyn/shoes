import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute, CreationOptional, HasManyGetAssociationsMixin, Association } from "sequelize";
import { SecretKey } from "./secretkey";
export class Device extends Model<InferAttributes<Device>, InferCreationAttributes<Device>> {
    declare ID: CreationOptional<string>;

    declare Name: string;

    declare tokens: NonAttribute<SecretKey[]>;

    declare static associations: {
        tokens: Association<Device, SecretKey>;
    }

    public static defineDevice(sequelize: Sequelize): NonAttribute<typeof Device> {

        if (sequelize.models.Device === Device) return Device;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            modelName: 'Device',
            timestamps: false,
        });

        return Device;
    }

    public static associateSecretKey(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Device != Device) return false;

        if (sequelize.models.SecretKey != SecretKey) return false;

        Device.hasMany(SecretKey, { foreignKey: "DeviceID", sourceKey: "ID", as: "secretkeys"});

        return true;
    }
}