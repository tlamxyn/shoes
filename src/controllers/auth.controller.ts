import { Request, Response } from "express"
import { Gender, Status, Type, User, UserCreationAttributes } from "../models/user";
import { PasswordGenerator } from "../services/password/password";
import { Created } from "../services/response_content/response_content";

export default class AuthController {
    public static async Register(req: Request, res: Response) {
        const {
            FullName,
            Email,
            Password
        } = req.body;
        
        const { salt, hash } = PasswordGenerator.createPasswordHash(Password);

        const user = await User.create({
            FullName: FullName,
            Email: Email,
            Username: Email,
            Password: hash,
            Salt: salt
        });

        return Created({response: res, data: user, message: undefined})
    }

    public static async Login(req: Request, res: Response) {
        const { Email, Password } = req.body;
        if (Email == "lam@gmail.com" && Password == "123456") {
            return res.status(200).send();
        }
        if (Email == "tuan@gmail.com" && Password == "123456") {
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