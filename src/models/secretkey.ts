import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute, ForeignKey, Association } from "sequelize";
import { User } from "./user";
import { Device } from "./device";

export class SecretKey extends Model<InferAttributes<SecretKey>, InferCreationAttributes<SecretKey>> {
    declare UserID: ForeignKey<string>;

    declare DeviceID: ForeignKey<string>;

    declare Key: string;

    declare user: NonAttribute<User>;
    declare device: NonAttribute<Device>;

    public static associations: {
        user: Association<SecretKey, User>
        device: Association<SecretKey, Device>
    }

    public static defineSecretKey(sequelize: Sequelize): NonAttribute<typeof SecretKey> {

        if (sequelize.models.SecretKeyken === SecretKey) return SecretKey;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            DeviceID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Key: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'SecretKey',
            timestamps: false,
        });

        return SecretKey;
    }

    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.SecretKey != SecretKey) return false;

        if (sequelize.models.User != User) return false;

        SecretKey.belongsTo(User, {foreignKey: "UserID", as: "user"});

        return true;
    }

    public static associateDevice(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.SecretKey != SecretKey) return false;

        if (sequelize.models.Device != Device) return false;

        SecretKey.belongsTo(Device, {foreignKey: "DeviceID", as: "device"});

        return true;
    }
}