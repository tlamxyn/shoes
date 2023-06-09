import { Router } from "express";

import product_router from './product.router';
import user_router from "./user.router";

const router = Router()

router.use('/product', product_router)
router.use('/user', user_router)

export default router;