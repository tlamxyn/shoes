import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { DiscountItem } from "./discountitem";
import { Event } from "./event";

export class Discount extends Model<InferAttributes<Discount>, InferCreationAttributes<Discount>> {
    declare ID: CreationOptional<string>;
    declare Discount: number;
    declare EventID: CreationOptional<ForeignKey<string> | null>;

    declare event: NonAttribute<Event>;
    declare discountitems: NonAttribute<DiscountItem[]>;

    declare static associations: {
        event: Association<Discount, Event>,
        discountitems: Association<Discount, DiscountItem>;
    }

    public static defineDiscount(sequelize: Sequelize): NonAttribute<typeof Discount> {

        if (sequelize.models.Discount === Discount) return Discount;

        this.init({
            ID: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            Discount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            },
            EventID: {
                type: DataTypes.UUID,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Discount',
            timestamps: false,
        });

        return Discount;
    }
    public static associateEvent(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Discount != Discount) return false;

        if (sequelize.models.Event != Event) return false;

        Discount.belongsTo(Event, { foreignKey: "EventID", as: "event" });

        return true;
    }
    public static associateDiscountItem(sequelize: Sequelize): NonAttribute<boolean> {
        if (sequelize.models.Discount != Discount) return false;

        if (sequelize.models.DiscountItem != DiscountItem) return false;

        Discount.hasMany(DiscountItem, { foreignKey: "DiscountID", sourceKey: "ID", as: "discountitems" });

        return true;
    }
}