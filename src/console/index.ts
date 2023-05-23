import { ConsoleAction } from "./type";
import { migrate } from "../migrations/migrate";
import { seeder } from "../seeders/seeder";

require("dotenv").config();

const argv = process.argv

if (argv.length == 2) {
    console.log("Lacking of arguments")
    process.exit(0)
}

argv.splice(0, 2)

const full_regrex = /^(--(((force=)|(alter=))((true)|(false))))/igm;

if (argv[0].toString() === ConsoleAction[ConsoleAction.migrate]) {
    let force = false;
    let alter = false;
    argv.forEach(value => {
        if (value.match(full_regrex)) {
            value.split("=")[0] == "--force" ?
                (force = value.split("=")[1] == "true" ? true : false) :
                (alter = value.split("=")[1] == "true" ? true : false)

        }
    })
    migrate({force: force, alter: alter})
}

else if (argv[0].toString() === ConsoleAction[ConsoleAction.seed]) {
    seeder();
}

else {
    console.log("Wrong arguments")
    process.exit(0)
}
