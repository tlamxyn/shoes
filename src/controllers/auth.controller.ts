import { Request, Response } from "express"

export default class AuthController {
    public static async Register(req: Request, res: Response) {
        return res.status(200).send();
    }

    public static async Login(req: Request, res: Response) {
        const { Email, Password } = req.body;
        if(Email == "lam@gmail.com" && Password == "123456") {
            return res.status(200).send();
        }
        if(Email == "tuan@gmail.com" && Password == "123456") {
            return res.status(200).send();
        }
        return res.status(400).send();
    }

    public static async Logout(req: Request, res: Response) {
        return res.status(200).send();
    }

    public static async Im(req: Request, res: Response) {
        return res.status(200).send();
    }
}