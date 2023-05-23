import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {

}