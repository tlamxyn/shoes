import { Router } from "express";

import AuthController from "../controllers/auth.controller";

const auth_router = Router();

auth_router.post('/register', AuthController.Register)
auth_router.post('/login', AuthController.Login)
auth_router.post('/logout', AuthController.Logout)
auth_router.get('/im', AuthController.Im)

export default auth_router;