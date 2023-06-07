import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export enum Table {
    Event = "Event",
    Product = "Product",
    Review = "Review",
    Problem = "Problem",
    Notification = "Notification"
}

export class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    declare OwnerID: CreationOptional<ForeignKey<string>>;
    declare Table: Table;
    declare Name: string;

    public static defineImage(sequelize: Sequelize): NonAttribute<typeof Image> {

        if (sequelize.models.Image === Image) return Image;

        this.init({
            OwnerID: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            Table: {
                type: DataTypes.ENUM({
                    values: Object.values(Table)
                }),
                primaryKey: true
            },
            Name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Image',
            timestamps: false,
        });

        return Image;
    }
}