import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    declare UserID: ForeignKey<string>;
    declare ProductID: ForeignKey<string>;
    declare InvoiceID: ForeignKey<string>;
    declare Content: string;
    declare Star: number;
    declare CreatedAt: CreationOptional<Date>;

    public static defineReview(sequelize: Sequelize): NonAttribute<typeof Review> {

        if (sequelize.models.Review === Review) return Review;

        this.init({
            UserID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ProductID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            InvoiceID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            Content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Star: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1
            },
            CreatedAt: DataTypes.DATE,
        }, {
            sequelize,
            modelName: 'Review',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: false,
            deletedAt: false,
        });

        return Review;
    }
}