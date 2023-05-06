import app from "./app";
import { shoesmanager } from "./manager";

require("dotenv").config();

const main = async () => {

    const { port } = process.env

    // Initing Database
    await shoesmanager.initDatabase()

    // Activating App
    const server = app.listen(port, () => { 
        console.log(`Server is Listening on port ${port}`) 
    })

    shoesmanager.addListener("exit", () => server.close())
}

main()