import { MySQL } from "../database/database";
import { Permission } from "../models/permission";
import { User } from "../models/user";
import { seed } from "./seed";

export const seeder = async () => {
    await MySQL.init()

    User.bulkCreate(seed.users);
    Permission.bulkCreate(seed.permissions);
}