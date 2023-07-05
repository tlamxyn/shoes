import { Request, Response } from "express"
import { Status, User } from "../models/user";
import { PasswordGenerator } from "../utils/password";
import { OK, Created, Unauthorized, InternalServerError, BadRequest } from "../services/response_content/response_content";
import { randomDigitByTime, randomSecretKey } from "../utils/random";
import { EmailService } from "../services/mail/mail";
import { VType, Verification } from "../models/verification";
import { MySQL } from "../database/database";
import { VERIFY_EMAIL_CODE_FAILTIME, VERIFY_EMAIL_CODE_MAXAGE } from "../contant";
import { CRUD, Permission, Role, Table } from "../models/permission";
import { setCookies } from "../utils/request_header";
import { Device } from "../models/device";
import { SecretKey } from "../models/secretkey";
import { Op } from "sequelize";
import { SignAccessToken, SignRefreshToken } from "../utils/jwt";

export default class AuthController {
    public static async Register(req: Request, res: Response): Promise<Response> {

        const {
            FullName,
            Email,
            Password
        } = req.body;

        // Start Transaction
        const transaction = await MySQL.sequelize!.transaction();

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
                    await transaction.rollback();
                    return BadRequest(res, { message: "Email Existed" });
                }
            }

            const { salt, hash } = PasswordGenerator.createPasswordHash(Password);

            let user: User = existedUser
                ?
                await existedUser.update({
                    FullName: FullName,
                    Username: Email,
                    Password: hash,
                    Salt: salt
                }, { transaction: transaction })
                :
                await User.create({
                    FullName: FullName,
                    Email: Email,
                    Username: Email,
                    Password: hash,
                    Salt: salt
                }, { transaction: transaction });

            // Create verify code and send mail
            const emailCode = randomDigitByTime(6);

            const isCreated = await Verification.upsert({
                UserID: user.ID,
                VType: VType.Email,
                VName: user.Email,
                Code: emailCode,
                Time: 0,
                ExpiredAt: new Date(Date.now() + VERIFY_EMAIL_CODE_MAXAGE)
            }, { transaction: transaction });
            if (!isCreated) {
                await transaction.rollback();
                return InternalServerError(res, { message: "Generate Verify Code Fail" });
            }

            const email = existedUser ? existedUser.Email : user.Email;
            const isSent = await EmailService.sendMail(
                email,
                "SHOES - Send Verify Code",
                `Your verify code is ${emailCode}`
            );
            if (!isSent) {
                await transaction.rollback();
                return InternalServerError(res, { message: "Send Verify Code Fail" });
            }

            await transaction.commit();   // Complete transaction

            return Created(res, {
                data: existedUser ? existedUser : user!,
                message: undefined
            })

        } catch (error) {
            console.log(error)
            await transaction.rollback();
            return InternalServerError(res, { message: error });
        }
    }

    public static async ResendEmail(req: Request, res: Response): Promise<Response> {
        const transaction = await MySQL.sequelize!.transaction();
        try {
            const { Email } = req.body;

            // Check User Existence
            const user = await User.findOne({
                where: {
                    Email: Email
                }
            });
            if (!user) {
                await transaction.rollback();
                return BadRequest(res, { message: "This Email Is Not Existed" });
            }

            if (user.Status === Status.Available) {
                await transaction.rollback();
                return BadRequest(res, { message: "This Email is already Verified" });
            }

            if (user.Status === Status.Locked) {
                await transaction.rollback();
                return BadRequest(res, { message: "This Email is already Locked, contact to Admin for more infos" });
            }

            // Generate Email Code
            const emailCode = randomDigitByTime(6);
            const isCreated = await Verification.upsert({
                UserID: user.ID,
                VType: VType.Email,
                VName: user.Email,
                Code: emailCode,
                Time: 0,
                ExpiredAt: new Date(Date.now() + VERIFY_EMAIL_CODE_MAXAGE)
            }, { transaction: transaction });
            if (!isCreated) {
                await transaction.rollback();
                return InternalServerError(res, { message: "Generate Verify Code Fail" });
            }

            // Send Mail
            const isSent = await EmailService.sendMail(
                Email,
                "SHOES - Send Verify Code",
                `Your verify code is ${emailCode}`
            );
            if (!isSent) {
                await transaction.rollback();
                return InternalServerError(res, { message: "Send Verify Code Fail" });
            }

            await transaction.commit();

            return Created(res, {
                message: "Resend Email Completed"
            })
        } catch (error) {
            console.log(error)
            await transaction.rollback();
            return InternalServerError(res, { message: error });
        }
    }

    public static async VerifyEmail(req: Request, res: Response): Promise<Response> {

        const transaction = await MySQL.sequelize!.transaction();

        try {
            // Find User
            const { Email, EmailCode } = req.body;
            const user = await User.findOne({
                where: {
                    Email: Email
                },
            });
            if (!user) {
                await transaction.rollback();
                return BadRequest(res, { message: "Can't find Email" });
            }

            // Find Verification Code
            const verification = await Verification.findOne({
                where: {
                    UserID: user?.ID
                }
            })
            if (!verification) {
                await transaction.rollback();
                return InternalServerError(res, { message: "Verify Email Code Still Not Created" });
            }

            // Check Wrong Time
            if (verification.Time >= VERIFY_EMAIL_CODE_FAILTIME) {
                await user.update({ Status: Status.Locked }, { transaction: transaction });
                await transaction.commit();
                return BadRequest(res, { message: "Your account has been locked" });
            }

            // Check Expiration
            if (Date.now() - verification.ExpiredAt.getTime() > VERIFY_EMAIL_CODE_MAXAGE) {
                await transaction.rollback();
                return BadRequest(res, { message: "Verify Email Code is Expired" });
            }

            // Check Code
            if (EmailCode != verification.Code) {
                await verification.update({
                    Time: verification.Time + 1
                }, { transaction: transaction });
                await transaction.commit();
                return BadRequest(res, { message: "Verify Email Code Wrong" });
            }

            // Active Account
            await user.update({ Status: Status.Available }, { transaction: transaction });

            // Delete verication
            await verification.destroy({ transaction: transaction });

            // Add Permission
            const isPer = await Permission.upsert({
                UserID: user.ID,
                Role: Role.Customer,
                Table: Table.ALL,
                CRUD: CRUD.All
            }, { transaction: transaction });

            if (!isPer) {
                await transaction.rollback();
                return InternalServerError(res, { message: "Fail to add permission" });
            }

            await transaction.commit();
            return OK(res, { message: "Your account has been activated" });
        } catch (error) {
            console.log(error)
            await transaction.rollback();
            return InternalServerError(res, { message: error });
        }
    }

    public static async Login(req: Request, res: Response): Promise<Response> {

        const { Email, Password } = req.body;
        const DeviceName = req.cookies['DeviceName'] ?? null;

        try {

            // Find device
            const device = await Device.findOne({ where: { Name: DeviceName } })

            // Check valid device
            if (!device) {
                return Unauthorized(res, { message: `We don't support ${DeviceName} device` });
            }

            // Find User
            const user = await User.findOne({
                where: {
                    [Op.and]: [
                        { Email: Email },
                        {
                            Status: {
                                [Op.ne]: Status.Unavailable
                            }
                        }]
                }
            });

            // Check User existence
            if (!user) {
                return Unauthorized(res, { message: "Email or Password incorrect" });
            }

            // Check Password Correction
            const isValidPassword = PasswordGenerator
                .isValidPassword(Password, user!.Password ?? "", user!.Salt ?? "");
            if (!isValidPassword) {
                return Unauthorized(res, { message: "Email or Password incorrect" });
            }

            // Check User is not locked
            if (user.Status == Status.Locked) {
                return Unauthorized(res, { message: "Your account has been locked" });
            }

            // Generate access token
            const accessToken = SignAccessToken({ "ID": user.ID, "Username": user.Username });

            // Generate refresh token
            const refreshKey = randomSecretKey();
            const token = await SecretKey.upsert({
                UserID: user.ID,
                DeviceID: device.ID,
                Key: refreshKey
            });
            if (!token) return InternalServerError(res, { message: "Fail to generate token" });
            const refreshToken = SignRefreshToken({ ID: user.ID, Username: user.Username }, refreshKey);

            setCookies(res, {
                AccessToken: accessToken,
                RefreshToken: refreshToken,
                DeviceName: device.Name
            }, { httpOnly: true })

            return OK(res);
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }

    public static async Logout(req: Request, res: Response): Promise<Response> {
        try {
            setCookies(res, {
                AccessToken: '',
                RefreshToken: '',
                DeviceName: req.cookies['DeviceName'] ?? null
            }, { httpOnly: true })

            return OK(res);
        } catch (error) {
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }

    public static async ResetPassword(req: Request, res: Response): Promise<Response> {
        const {
            OldPassword = null, NewPassword = null
        } = req.body;

        const transaction = await MySQL.sequelize!.transaction();

        try {
            const user = await User.findOne({ where: { ID: res.locals.UserID } });

            // Check Old Password Correction
            const isValidOldPassword = PasswordGenerator
                .isValidPassword(OldPassword, user!.Password ?? "", user!.Salt ?? "");
            if (!isValidOldPassword) {
                return Unauthorized(res, { message: "Password incorrect" });
            }

            // Update New Password
            const { salt, hash } = PasswordGenerator.createPasswordHash(NewPassword);
            const updatedUser = await user!.update({ Salt: salt, Password: hash }, { transaction: transaction });

            if (!updatedUser) {
                await transaction.rollback();
                return InternalServerError(res, { message: "Reset Password Failed" })
            }

            await transaction.commit();
            return OK(res);
        } catch (error) {
            await transaction.rollback();
            console.log(error)
            return InternalServerError(res, { message: error });
        }
    }
    public static async ForgotPassword(req: Request, res: Response): Promise<Response> {
        const {
            Email = null, AlreadySendMail = false,
            OldPassword = null, NewPassword = null
        } = req.body;

        const transaction = await MySQL.sequelize!.transaction();

        if (!AlreadySendMail) {
            //Send Email
            try {
                // Check User Existence
                const user = await User.findOne({
                    where: {
                        Email: Email
                    }
                });
                if (!user) {
                    await transaction.rollback();
                    return BadRequest(res, { message: "This Email Is Not Existed" });
                }

                if (user.Status === Status.Locked) {
                    await transaction.rollback();
                    return BadRequest(res, { message: "This Email is already Locked, contact to Admin for more infos" });
                }

                // Generate New Password
                const newPassword = randomDigitByTime(8);
                const { salt, hash } = PasswordGenerator.createPasswordHash(NewPassword);
                const isUpdated = await user.update({
                    Password: hash,
                    Salt: salt,
                }, { transaction: transaction });
                if (!isUpdated) {
                    await transaction.rollback();
                    return InternalServerError(res, { message: "Generate Verify Code Fail" });
                }

                // Send Mail
                const isSent = await EmailService.sendMail(
                    Email,
                    "SHOES - New Password",
                    `Your New Password is ${newPassword}. Using this to create your own password`
                );
                if (!isSent) {
                    await transaction.rollback();
                    return InternalServerError(res, { message: "Send Verify Code Fail" });
                }

                await transaction.commit();

                return OK(res, {
                    message: "Create New Password Completed"
                })
            } catch (error) {
                console.log(error)
                await transaction.rollback();
                return InternalServerError(res, { message: error });
            }

        } else {

            // Change Password
            try {
                const user = await User.findOne({ where: { Email: Email } });

                if (!user) {
                    await transaction.rollback();
                    return BadRequest(res, { message: "User Not Exist" });
                }

                // Check Old Password Correction
                const isValidOldPassword = PasswordGenerator
                    .isValidPassword(OldPassword, user!.Password ?? "", user!.Salt ?? "");
                if (!isValidOldPassword) {
                    await transaction.rollback();
                    return Unauthorized(res, { message: "Password incorrect" });
                }

                // Update New Password
                const { salt, hash } = PasswordGenerator.createPasswordHash(NewPassword);
                const updatedUser = await user!.update({ Salt: salt, Password: hash }, { transaction: transaction });

                if (!updatedUser) {
                    await transaction.rollback();
                    return InternalServerError(res, { message: "Reset Password Failed" })
                }

                await transaction.commit();
                return OK(res);
            } catch (error) {
                await transaction.rollback();
                console.log(error)
                return InternalServerError(res, { message: error });
            }
        }
    }
}