import { Router } from "express";

import product_router from './product.router';
import user_router from "./user.router";
import image_router from "./image.router";

const router = Router()

router.use('/product', product_router)
router.use('/user', user_router)
router.use('/image', image_router)

export default router;