import { Request, Response } from "express"
import { Status, User } from "../models/user";
import { PasswordGenerator } from "../services/password/password";
import { OK, Created, Unauthorized, InternalServerError, BadRequest } from "../services/response_content/response_content";

export default class AuthController {
    public static async Register(req: Request, res: Response): Promise<Response> {

        const {
            FullName,
            Email,
            Password
        } = req.body;

        try {
            // Find User by Email
            const existedUser = await User.findOne({
                where: {
                    Email: Email,
                }
            })

            // Check if User with Email is existed
            if (existedUser) {
                if (existedUser.Status == Status.Available ||
                    existedUser.Status == Status.Locked
                ) {
                    return BadRequest(res, { message: "Email Existed" });
                }
            }

            const { salt, hash } = PasswordGenerator.createPasswordHash(Password);

            let user: User;

            if (existedUser) // If Account hadn't verified yet
                existedUser.update({
                    FullName: FullName,
                    Username: Email,
                    Password: hash,
                    Salt: salt
                })
            else // If Account don't exist
                user = await User.create({
                    FullName: FullName,
                    Email: Email,
                    Username: Email,
                    Password: hash,
                    Salt: salt
                });

            // Create verify code and send mail
            /**
             *  Code something here
             */

            return Created(res, {
                data: existedUser ? existedUser : user!,
                message: undefined
            })

        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }

    public static async VerifyAccount(req: Request, res: Response): Promise<Response> {
        try {
            return OK(res);
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }

    public static async Login(req: Request, res: Response): Promise<Response> {

        const { Email, Password } = req.body;

        try {

            const user = await User.findOne({ where: { Email: Email } });

            if (!user) {
                return Unauthorized(res, { message: "Email or Password incorrect" });
            }

            const isValidPassword = PasswordGenerator
                .isValidPassword(Password, user!.Password ?? "", user!.Salt ?? "");

            if (!isValidPassword) {
                return Unauthorized(res, { message: "Email or Password incorrect" });
            }
            return OK(res);
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }

    public static async Logout(req: Request, res: Response): Promise<Response> {
        return OK(res);
    }
}