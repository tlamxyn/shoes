import { InferCreationAttributes } from "sequelize";
import { ProductType } from "../../models/producttype";

export const producttype: InferCreationAttributes<ProductType>[] = [
    {
        ID: "3868ceb0-1207-49c3-bd6e-7995f1509d3f",
        Name: "Shoes"
    }, {
        ID: "5688cc39-5a95-4e35-958a-09b6ec5c128a",
        Name: "Skirt"
    }, {
        ID: "5688cc39-5a95-4e35-958a-09b6ec5c123T",
        Name: "Cap"
    }, {
        ID: "5688cc39-5a95-4e35-958a-09b6eyyc128a",
        Name: "Gloves"
    }, {
        ID: "8f0de00d-6d3a-42f6-85b9-7acf086ea0fa",
        Name: "Ring"
    }
]