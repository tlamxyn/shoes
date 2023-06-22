import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { Product } from "./product";
import { Review } from "./review";
import { Problem } from "./problem";
import { Event } from './event';
import { Notification } from "./notification";
import { User } from "./user";

export enum Table {
    Event = "Event",
    Product = "Product",
    Review = "Review",
    Problem = "Problem",
    Notification = "Notification",
    User = "User"
}

export class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    declare ID: CreationOptional<string>;
    declare OwnerID: ForeignKey<string>;
    declare Table: Table;
    declare Name: string;

    declare event: NonAttribute<Event>;
    declare product: NonAttribute<Product>;
    declare review: NonAttribute<Review>;
    declare problem: NonAttribute<Problem>;
    declare notification: NonAttribute<Notification>;
    declare user: NonAttribute<User>;

    declare static associations: {
        event: Association<Image, Event>,
        product: Association<Image, Product>,
        review: Association<Image, Review>,
        problem: Association<Image, Problem>,
        notification: Association<Image, Notification>,
        user: Association<Image, User>
    }

    public static defineImage(sequelize: Sequelize): NonAttribute<typeof Image> {

        if (sequelize.models.Image === Image) return Image;

        this.init({
            ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            OwnerID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Table: {
                type: DataTypes.ENUM({
                    values: Object.values(Table)
                }),
                allowNull: false
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            modelName: 'Image',
            timestamps: false,
        });

        return Image;
    }
    public static associateEvent(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Image != Image) return false;

        if (sequelize.models.Event != Event) return false;

        Image.belongsTo(Event, { foreignKey: "OwnerID", as: "event" });

        return true;
    }
    public static associateProduct(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Image != Image) return false;

        if (sequelize.models.Product != Product) return false;

        Image.belongsTo(Product, { foreignKey: "OwnerID", as: "product" });

        return true;
    }
    public static associateProblem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Image != Image) return false;

        if (sequelize.models.Problem != Problem) return false;

        Image.belongsTo(Problem, { foreignKey: "OwnerID", as: "problem" });

        return true;
    }
    public static associateReview(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Image != Image) return false;

        if (sequelize.models.Review != Review) return false;

        Image.belongsTo(Review, { foreignKey: "OwnerID", as: "review" });

        return true;
    }
    public static associateNotification(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Image != Image) return false;

        if (sequelize.models.Notification != Notification) return false;

        Image.belongsTo(Notification, { foreignKey: "OwnerID", as: "notification" });

        return true;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Image != Image) return false;

        if (sequelize.models.User != User) return false;

        Image.belongsTo(User, { foreignKey: "OwnerID", as: "user" });

        return true;
    }
}