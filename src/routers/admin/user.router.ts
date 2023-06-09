import { Router } from "express";

import AuthController from "../../controllers/auth.controller";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";

const user_router = Router();

export default user_router;