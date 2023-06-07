import { where } from "sequelize";
import { MySQL } from "../src/database/database";
import { shoesmanager } from "../src/manager";
import { User } from "../src/models/user";
import { Permission } from "../src/models/permission";
import { randomSecretKey } from "../src/utils/random"

require("dotenv").config();

const main = async () => {

    console.log(randomSecretKey())
}

main()