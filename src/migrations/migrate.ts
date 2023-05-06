import { MySQL } from "../database/database";

export const migrate = async (option?: { force: boolean, alter: boolean }) => {
    const { force, alter } = option ?? { force: false, alter: false }
    await MySQL.init()

    MySQL.sequelize?.sync({force: force, alter: alter})
}