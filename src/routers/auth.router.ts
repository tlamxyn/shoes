import { Router } from "express";

import AuthController from "../controllers/auth.controller";
import { Authentication } from "../middlewares/auth.middleware";

const auth_router = Router();

auth_router.post('/register', AuthController.Register)              // Customer
auth_router.post('/login', AuthController.Login)                    // Customer, Admin, Shipper
auth_router.post('/logout', Authentication, AuthController.Logout)                  // Customer, Admin, Shipper

auth_router.post('/email/verify', Authentication, AuthController.VerifyEmail)       // Customer, Admin, Shipper
auth_router.post('/email/resend-code', Authentication, AuthController.ResendEmail)  // Customer, Admin, Shipper

export default auth_router;