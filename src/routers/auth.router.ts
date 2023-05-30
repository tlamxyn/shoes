import { Router } from "express";

import AuthController from "../controllers/auth.controller";

const auth_router = Router();

auth_router.post('/register', AuthController.Register)              // Customer
auth_router.post('/login', AuthController.Login)                    // Customer, Admin, Shipper
auth_router.post('/logout', AuthController.Logout)                  // Customer, Admin, Shipper

auth_router.post('/email/verify', AuthController.VerifyEmail)       // Customer, Admin, Shipper
auth_router.post('/email/resend-code', AuthController.ResendEmail)  // Customer, Admin, Shipper

export default auth_router;