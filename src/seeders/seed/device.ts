import { InferCreationAttributes } from "sequelize";
import { Device } from "../../models/device";

export const devices: InferCreationAttributes<Device>[] = [
    {
        ID: "3f151cd3-f3c6-4340-8884-073eada85d1a",
        Name: "Web"
    }, {
        ID: "6759fdbe-33fe-4e3a-b965-01d9bfe9f405",
        Name: "Iphone"
    }, {
        ID: "ff3a02ea-f153-48d5-bebc-4153c5fd4bed",
        Name: "Android"
    }
]