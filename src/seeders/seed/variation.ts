import { InferCreationAttributes } from "sequelize";
import { Variation, Type } from "../../models/variation";

export const producttype: InferCreationAttributes<Variation>[] = [
    {
        ID: "055b1ced-09ba-482f-ae46-0dc2b95c76df",
        Name: "Size chung",
        Type: Type.Text
    }, {
        ID: "412796ed-d58e-4893-b6dc-e91c8ec78ae3",
        Name: "Size Cloth",
        Type: Type.Text
    }, {
        ID: "c065fb54-6c8b-4c83-9dd8-05878fbb3cf8",
        Name: "Màu Điện thoại",
        Type: Type.Color
    }, {
        ID: "76c260ac-36fc-4b37-b3d7-9999a1a79081",
        Name: "Màu chung",
        Type: Type.Color
    }
]