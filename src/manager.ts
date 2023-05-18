import { EventEmitter } from "events";
import { MySQL } from "./database/database";
import { EmailService } from "./services/mail/mail";

const onExit = (manager: EventEmitter) => {
    process.on("SIGINT", () => {
        process.emit("exit", 0)
    });
    process.on("exit", () => {
        console.log("Closing Program...")
        manager.emit("exit")
    });
}

class ShoesManager extends EventEmitter {
    constructor() {
        super()
        onExit(this)
        console.log("Event Initiated")
    }

    public async closeDatabase() {
        await MySQL.close()
    }
    public async initDatabase() {
        await MySQL.init()
    }
    public async exit() {
        EmailService.closeTransporter();
        await this.closeDatabase();
        process.exit(0)
    }

}

const shoesmanager = new ShoesManager()

export { shoesmanager }