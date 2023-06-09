import { Request, Response, NextFunction } from "express"
import { InternalServerError, NotFound, Unauthorized } from "../services/response_content/response_content";
import { GetPayload, SignAccessToken, VerifyAccessToken, VerifyRefreshToken, isExpiredJwtError } from "../utils/jwt";
import { JsonWebTokenError } from "jsonwebtoken";
import { Status, User } from "../models/user";
import { SecretKey } from "../models/secretkey";
import { Device } from "../models/device";
import { Op } from "sequelize";
import { setCookies } from "../utils/request_header";
import { Permission, Role, Table } from "../models/permission";
import { verifyPermissionRequirement } from "../utils/authorization";

/**
 * 
 * @description 
 * It checks the existence of the two token,
 * then verifies them.
 * 
 * In this function, it also check the existence of the user trying to call api.
 * Additionally, all users that still not being locked can be passed.
 */
export async function Authentication(req: Request, res: Response, next: NextFunction) {
    try {
        const { RefreshToken = null, AccessToken = null, DeviceName = null } = req.cookies;
        if (!AccessToken || !RefreshToken || !DeviceName) {
            return Unauthorized(res, { message: "Login Required" });
        }

        // Check device existence
        const device = await Device.findOne({ where: { Name: DeviceName } })
        if (!device) {
            return Unauthorized(res, { message: `We don't support ${DeviceName} device` });
        }

        //Verify Access Token
        const AccessPayload = VerifyAccessToken(AccessToken);

        // When Access Token is expired, check RefreshToken
        if (AccessPayload instanceof JsonWebTokenError) {
            // Check if Access Token is expired
            if (!isExpiredJwtError(AccessPayload)) {
                return Unauthorized(res, { message: "invalid token" })
            }

            // Get UserID from expired Access Token
            let FailAccessPayload = (GetPayload(AccessToken) as User);
            res.locals.UserID = FailAccessPayload.ID

            // Check user existence
            const user = await User.findOne({ where: { ID: res.locals.UserID } })
            if (!user) {
                return Unauthorized(res, { message: `This user isn't exist` });
            }

            // Check locked user
            if (user.Status == Status.Locked) {
                return Unauthorized(res, { message: "Your account has been locked" });
            }

            const secretkey = await SecretKey.findOne({ // Find refresh key
                where: {
                    [Op.and]: {
                        UserID: user.ID,
                        DeviceID: device.ID
                    }
                }
            })
            if (!secretkey) {    // Check refresh key existence
                return Unauthorized(res, { message: "Login is required" });
            }

            // verify refresh token. Wrong then login. True then update access token
            const RefreshPayload = VerifyRefreshToken(RefreshToken, secretkey.Key);
            if (RefreshPayload instanceof JsonWebTokenError) {
                if (!isExpiredJwtError(AccessPayload)) {
                    return Unauthorized(res, { message: "invalid token" })
                }
                return Unauthorized(res, { message: "Login is required" });
            }
            // update access token
            setCookies(res, {
                AccessToken: SignAccessToken({ ID: FailAccessPayload.ID, Username: FailAccessPayload.Username }),
                RefreshToken: RefreshToken,
                DeviceName: device.Name
            })

        } else { // Access Token is true
            res.locals.UserID = (AccessPayload.payload as User).ID
        }
        next();
    } catch (error) {
        console.log(error)
        return InternalServerError(res, { message: error })
    }
}

type PerCheck = Pick<Permission, 'Table' | 'CRUD'>
/**
 * 
 * @description
 * Check user Permission.
 * The `Authentication` middleware must be in front of this function in router
 */
export function Authorization(role: Role = Role.Customer, percheck: PerCheck[] = []) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!res.locals.UserID) {
                return NotFound(res, {});
            }

            // Check role
            const permissions = await Permission.findAll({
                where: {
                    [Op.and]: { UserID: res.locals.UserID, Role: role }
                }
            })
            if (!permissions) {
                return Unauthorized(res, { message: "Không đủ quyền hạn truy cập" })
            }

            // Check Table 
            // Regardless what table permission is, if "all" table exists, 
            // then it overrides all other table permissions.
            const completedper: PerCheck[] = percheck.filter(per => {
                // Check if `all` table is existed
                let allTable = permissions.find(value => value.Table == Table.ALL);
                // If `all` table is existed then check CRUD, if not then check normal table
                if (allTable) {
                    return verifyPermissionRequirement(per.CRUD ,allTable.CRUD)
                }
                // Check if normal table is existed
                let normalTable = permissions.find(value =>value.Table == per.Table)
                if(normalTable) {
                    return verifyPermissionRequirement(per.CRUD, normalTable.CRUD)
                }
                return false
            })
            if (completedper.length != percheck.length) {
                return Unauthorized(res, { message: "Không đủ quyền hạn truy cập" })
            }
            next();
        } catch (error) {
            console.log(error);
            return InternalServerError(res, { message: error })
        }
    }
}