import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { User } from "./user";
import { Image } from "./image";

export enum Status {
    Waiting = "Waiting",
    Solving = "Solving",
    Done = "Done"
}

export class Problem extends Model<InferAttributes<Problem>, InferCreationAttributes<Problem>> {
    declare ID: CreationOptional<string>;
    declare UserID: ForeignKey<string>;
    declare Title: string;
    declare Content: string;
    declare Status: CreationOptional<Status>;
    declare CreatedAt: CreationOptional<Date>;

    declare user: NonAttribute<User>;
    declare images: NonAttribute<Image[]>;

    declare static associations: {
        user: Association<Problem, User>,
        images: Association<Problem, Image>
    }

    public static defineProblem(sequelize: Sequelize): NonAttribute<typeof Problem> {

        if (sequelize.models.Problem === Problem) return Problem;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            UserID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM({
                    values: Object.values(Status)
                }),
                allowNull: false,
                defaultValue: Status.Waiting
            },
            CreatedAt: DataTypes.DATE,
        }, {
            sequelize,
            modelName: 'Problem',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: false,
            deletedAt: false
        });

        return Problem;
    }
    public static associateUser(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Problem != Problem) return false;

        if (sequelize.models.User != User) return false;

        Problem.belongsTo(User, { foreignKey: "UserID", as: "user" });

        return true;
    }
    public static associateImage(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Problem != Problem) return false;

        if (sequelize.models.Image != Image) return false;

        Problem.hasMany(Image, { foreignKey: "ProblemID", sourceKey: "ID", as: "images" });

        return true;
    }
}