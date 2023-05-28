import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { User } from "./user";

export enum VType {
    Email = "Email",
    Phone = "Phone"
}

export class Verification extends Model<InferAttributes<Verification>, InferCreationAttributes<Verification>> {
    declare UserID: ForeignKey<string>;
    declare VType: VType;
    declare VName: string;
    declare Code: string;
    declare Time: number;

    public static defindVerification(sequelize: Sequelize): NonAttribute<typeof Verification> {
        if (sequelize.models.Verification === Verification) return Verification;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            VType: {
                type: DataTypes.ENUM({
                    values: Object.values(VType)
                }),
                allowNull: false,
                defaultValue: VType.Email
            },
            VName: {
                type: DataTypes.STRING(),
                allowNull: false,
                unique: true
            },
            Code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Time: {
                type: DataTypes.NUMBER,
                allowNull: false,
                defaultValue: 0
            }
        }, {
            sequelize,
            modelName: "Verification",
        });

        return Verification;
    }

    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Verification != Verification) return false;

        if (sequelize.models.User != User) return false;

        Verification.belongsTo(User, {foreignKey: "UserID"});

        return true;
    }
}