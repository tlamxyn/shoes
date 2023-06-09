import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Image } from "./image";
import { Discount } from "./discount";

export class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare ID: CreationOptional<string>;
    declare Title: string;
    declare SubTitle: CreationOptional<string | null>;
    declare Content: string;
    declare FromDate: CreationOptional<Date | null>;
    declare ToDate: CreationOptional<Date | null>;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;

    declare images: NonAttribute<Image[]>;
    declare discounts: NonAttribute<Discount[]>;

    declare static associations: {
        images: Association<Event, Image>,
        discounts: Association<Event, Discount>
    }

    public static defineEvent(sequelize: Sequelize): NonAttribute<typeof Event> {

        if (sequelize.models.Event === Event) return Event;

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
    public static associateDiscount(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Event != Event) return false;

        if (sequelize.models.Discount != Discount) return false;

        Event.hasMany(Discount, { foreignKey: "EventID", sourceKey: "ID", as: "discounts" });

        return true;
    }
    public static associateImage(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Event != Event) return false;

        if (sequelize.models.Image != Image) return false;

        Event.hasMany(Image, { foreignKey: "OwnerID", sourceKey: "ID", as: "images" });

        return true;
    }
}