import { InferCreationAttributes } from "sequelize";
import { Variation, Type } from "../../models/variation";

export const variations: InferCreationAttributes<Variation>[] = [
    {
        ID: "055b1ced-09ba-482f-ae46-0dc2b95c76df",
        Name: "Size chung",
        Type: Type.Text
    }, {
        ID: "76c260ac-36fc-4b37-b3d7-9999a1a79081",
        Name: "Màu chung",
        Type: Type.Color
    }
]