import { CreateOptions, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare ID: CreateOptions<String>;
    declare Name: String;
    declare Description: String;
    declare ProductTypeID: ForeignKey<String>;
    
}