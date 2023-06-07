import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    declare ID: CreationOptional<string>;
    declare ProductID: ForeignKey<string>;
    declare Stock: number;
    declare Price: number;
    declare SKU: string;
    declare CreatedAt: CreationOptional<Date>;
    declare UpdatedAt: CreationOptional<Date>;
    declare DeletedAt: CreationOptional<Date | null>;

    public static defineItem(sequelize: Sequelize): NonAttribute<typeof Item> {

        if (sequelize.models.Item === Item) return Item;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            ProductID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Stock: {
                type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
                allowNull: false,
                defaultValue: 0
            },
            Price: {
                type: DataTypes.DOUBLE.UNSIGNED.ZEROFILL,
                allowNull: false,
                defaultValue: 0
            },
            SKU: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE,
            DeletedAt: DataTypes.DATE
        }, {
            sequelize,
            modelName: 'Item',
            timestamps: true,
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
            deletedAt: 'DeletedAt',
        });

        return Item;
    }
}