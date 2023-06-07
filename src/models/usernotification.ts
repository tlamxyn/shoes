import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class UserNotification extends Model<InferAttributes<UserNotification>, InferCreationAttributes<UserNotification>> {
    declare UserID: ForeignKey<string>;
    declare NotficationID: ForeignKey<string>;

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
}