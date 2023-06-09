import { Router } from "express";

import AuthController from "../../controllers/auth.controller";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";

const image_router = Router();

export default image_router;