import { Router } from "express";

import AuthController from "../../controllers/auth.controller";
import { Authentication, Authorization } from "../../middlewares/auth.middleware";

const product_router = Router();

export default product_router;