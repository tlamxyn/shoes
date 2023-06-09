import { Router } from "express";

import AuthController from "../controllers/auth.controller";
import { Authentication, Authorization } from "../middlewares/auth.middleware";

const auth_router = Router();

auth_router.post('/register', AuthController.Register)              // Customer
auth_router.post('/login', AuthController.Login)                    // Customer, Admin, Shipper
auth_router.post('/logout', Authentication, Authorization(), AuthController.Logout)                  // Customer, Admin, Shipper
auth_router.post('/password-reset', Authentication, Authorization(), AuthController.ResetPassword)
// auth_router.post('/password-forgot', Authentication, Authorization(), )

auth_router.post('/email/verify', Authentication, Authorization(), AuthController.VerifyEmail)       // Customer, Admin, Shipper
auth_router.post('/email/resend-code', Authentication, Authorization(), AuthController.ResendEmail)  // Customer, Admin, Shipper

export default auth_router;