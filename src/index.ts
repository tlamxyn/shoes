import app from "./app";
import { SMTPTransportOptions } from "./contant";
import { shoesmanager } from "./manager";
import { EmailService } from "./services/mail/mail";
import { ValidateWorker } from "./validator/validate";

require("dotenv").config();

const main = async () => {

    const { port } = process.env

    // Initing Database
    await shoesmanager.initDatabase()
    EmailService.initTransporter({
        ...SMTPTransportOptions,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    })

    // Activating App
    const server = app.listen(port, () => {
        console.log(`Server is Listening on port ${port}`)
    })

    // Using validation
    ValidateWorker.init()

    shoesmanager.addListener("exit", () => server.close())
}

main()