import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Image } from "./image";
import { UserNotification } from "./usernotification";

export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
    declare ID: CreationOptional<string>;
    declare Title: string;
    declare SubTitle: CreationOptional<string | null>;
    declare CreatedAt: CreationOptional<Date>;

    declare images: NonAttribute<Image[]>;
    declare usernotifications: NonAttribute<UserNotification[]>;

    declare static associations: {
        images: Association<Notification, Image>,
        usernotifications: Association<Notification, UserNotification>
    }

    public static defineNotification(sequelize: Sequelize): NonAttribute<typeof Notification> {

        if (sequelize.models.Notification === Notification) return Notification;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            Title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            SubTitle: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            CreatedAt: DataTypes.DATE,
        }, {
            sequelize,
            modelName: 'Notification',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: false,
            deletedAt: false
        });

        return Notification;
    }
    public static associateUserNotification(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Notification != Notification) return false;

        if (sequelize.models.UserNotification != UserNotification) return false;

        Notification.hasMany(UserNotification, { foreignKey: "NotificationID", sourceKey: "ID", as: "usernotifications" });

        return true;
    }
    public static associateImage(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Notification != Notification) return false;

        if (sequelize.models.Image != Image) return false;

        Notification.hasMany(Image, { foreignKey: "OwnerID", sourceKey: "ID", as: "images" });

        return true;
    }
}