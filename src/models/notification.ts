import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
    declare ID: CreationOptional<string>;
    declare Title: string;
    declare SubTitle: CreationOptional<string | null>;
    declare CreatedAt: CreationOptional<Date>;

    public static defineNotification(sequelize: Sequelize): NonAttribute<typeof Notification> {

        if (sequelize.models.Notification === Notification) return Notification;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
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
}