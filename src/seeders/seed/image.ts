import { InferCreationAttributes } from "sequelize";
import { Image, Table } from "../../models/image";

export const images: InferCreationAttributes<Image>[] = [
    {
        ID: "51c916d1-36b0-46de-ada9-52f366f644d5",
        OwnerID: "c730a40f-d5dc-4353-abb6-b4817bcbfc9e",
        Table: Table.Product,
        Name: "51c916d1-36b0-46de-ada9-52f366f644d5.jpg"
    }, {
        ID: "06c1ef04-fe0f-4901-88cb-3f1beac1eac8",
        OwnerID: "18fe3a64-f5df-4035-b6c5-760920f0fbaf",
        Table: Table.Product,
        Name: "06c1ef04-fe0f-4901-88cb-3f1beac1eac8.jpg"
    }, {
        ID: "82d7af0d-505e-4fe4-9650-7f56313b1add",
        OwnerID: "18fe3a64-f5df-4035-b6c5-760920f0fbaf",
        Table: Table.Product,
        Name: "82d7af0d-505e-4fe4-9650-7f56313b1add.jpg"
    }, {
        ID: "3d3bb92c-9b83-4d91-9e44-43e5282a8fde",
        OwnerID: "99d99627-6adc-435b-a0ae-b30e9120c8c4",
        Table: Table.Product,
        Name: "3d3bb92c-9b83-4d91-9e44-43e5282a8fde.jpg"
    }, {
        ID: "a94390ba-c005-4e40-8478-635cbdb1f844",
        OwnerID: "99d99627-6adc-435b-a0ae-b30e9120c8c4",
        Table: Table.Product,
        Name: "a94390ba-c005-4e40-8478-635cbdb1f844.jpg"
    }, {
        ID: "1eb41e09-3ba2-4b7a-9baf-3e7cb16ffb28",
        OwnerID: "7aa74cd7-0f24-418f-9200-5cf34fdb0edf",
        Table: Table.Product,
        Name: "1eb41e09-3ba2-4b7a-9baf-3e7cb16ffb28.jpg"
    }, {
        ID: "4bea454d-4f43-4bda-8597-8761997d4b92",
        OwnerID: "e10141bc-6931-4272-832c-2cada5fc9c6e",
        Table: Table.Product,
        Name: "4bea454d-4f43-4bda-8597-8761997d4b92.jpg"
    }, {
        ID: "bd46f3b0-6cd9-465b-b862-201e942de42b",
        OwnerID: "eb831c53-cee2-4aac-886d-1ddc84113ed0",
        Table: Table.Product,
        Name: "bd46f3b0-6cd9-465b-b862-201e942de42b.jpg"
    }, {
        ID: "78707eb7-5e05-434d-ac89-e45a1fc01746",
        OwnerID: "eb831c53-cee2-4aac-886d-1ddc84113ed0",
        Table: Table.Product,
        Name: "78707eb7-5e05-434d-ac89-e45a1fc01746.jpg"
    }
]