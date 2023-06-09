import { Association, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { User } from "./user";
import { Notification } from "./notification";

export class UserNotification extends Model<InferAttributes<UserNotification>, InferCreationAttributes<UserNotification>> {
    declare UserID: ForeignKey<string>;
    declare NotficationID: ForeignKey<string>;

    declare notification: NonAttribute<Notification>;
    declare user: NonAttribute<User>;

    declare static associations: {
        notification: Association<UserNotification, Notification>,
        user: Association<UserNotification, User>,
    }

    public static defineUserNotification(sequelize: Sequelize): NonAttribute<typeof UserNotification> {

        if (sequelize.models.UserNotification === UserNotification) return UserNotification;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            NotficationID: {
                type: DataTypes.UUID,
                primaryKey: true
            }
        }, {
            sequelize,
            modelName: 'UserNotification',
            timestamps: false,
        });

        return UserNotification;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.UserNotification != UserNotification) return false;

        if (sequelize.models.User != User) return false;

        UserNotification.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
    public static associateNotification(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.UserNotification != UserNotification) return false;

        if (sequelize.models.Notification != Notification) return false;

        UserNotification.belongsTo(Notification, { foreignKey: "NotificationID", as: "notification" });

        return true;
    }
}