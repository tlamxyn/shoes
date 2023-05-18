import { where } from "sequelize";
import { MySQL } from "../src/database/database";
import { shoesmanager } from "../src/manager";
import { User } from "../src/models/user";

require("dotenv").config();

const main = async () => {

    // Initing Database
    await shoesmanager.initDatabase()

    // const user = await User.create({
    //     FirstName: "Lam",
    //     LastName: "Đặng Trần",
    // })

    await User.update({FullName:"Gara", Email: "tlamxyn@gmail.com"}, {
        where: {
            FullName: "Lam"
        }
    })

    // console.log(user)
}

main()