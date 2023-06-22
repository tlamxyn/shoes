import { InferCreationAttributes } from "sequelize";
import { ProductType } from "../../models/producttype";

export const producttypes: InferCreationAttributes<ProductType>[] = [
    {
        ID: "3868ceb0-1207-49c3-bd6e-7995f1509d3f",
        Name: "Shoes"
    }, {
        ID: "5688cc39-5a95-4e35-958a-09b6ec5c128a",
        Name: "Clothes"
    }, {
        ID: "5688cc39-5a95-4e35-958a-09b6ec5c123f",
        Name: "Cap"
    }, {
        ID: "13547e0a-e14f-4b22-8530-df129a51720d",
        Name: "Gloves"
    }, {
        ID: "8f0de00d-6d3a-42f6-85b9-7acf086ea0fa",
        Name: "Ring"
    }
]