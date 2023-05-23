import { where } from "sequelize";
import { MySQL } from "../src/database/database";
import { shoesmanager } from "../src/manager";
import { User } from "../src/models/user";
import { Permission } from "../src/models/permission";

require("dotenv").config();

const main = async () => {

    // Initing Database
    await shoesmanager.initDatabase()


    const user = await User.findOne({
        where: {
            Email: "lam@gmail.com"
        },
        include: Permission
    })

    console.log(user)
}

main()