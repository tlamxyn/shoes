import { Sequelize, Options, BaseError, ConnectionError } from "sequelize";
import { shoesmanager } from "../manager";
import { User } from "../models/user";
import { Permission } from "../models/permission";
import { Verification } from "../models/verification";

export class MySQL {
    public static sequelize: Sequelize | undefined = undefined;
    public static config: Options = {
        dialect: "mysql",
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: true,
        },
        timezone: "+07:00"
    }
    public static async init() {
        const {
            DB_NAME = "test",
            DB_USERNAME = "root",
            DB_PASSWORD,
        } = process.env;

        this.sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, this.config);

        try {
            await this.sequelize.authenticate();
            console.log("Database Inited")
        } catch (error) {
            if (error instanceof ConnectionError) {
                console.log(error.original.message)
                await shoesmanager.exit()
            }
        }

        User.defineUser(this.sequelize)
        Permission.defindPermission(this.sequelize)
        Verification.defindVerification(this.sequelize)

        Permission.associateUser(this.sequelize)
        Verification.associateUser(this.sequelize)
        User.associatePermission(this.sequelize)
        User.associateVerification(this.sequelize)
    }
    public static async close() {
        await this.sequelize?.close()
        console.log("Database Closed")
    }
}