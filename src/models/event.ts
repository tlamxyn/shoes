import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare ID: CreationOptional<string>;
    declare Title: string;
    declare SubTitle: CreationOptional<string | null>;
    declare Content: string;
    declare FromDate: CreationOptional<Date | null>;
    declare ToDate: CreationOptional<Date | null>;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;

    public static defineEvent(sequelize: Sequelize): NonAttribute<typeof Event> {

        if (sequelize.models.Event === Event) return Event;

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
                allowNull: true
            },
            Content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            FromDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            ToDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE,
        }, {
            sequelize,
            modelName: 'Event',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
        });

        return Event;
    }
}