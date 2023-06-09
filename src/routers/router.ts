import { Router } from "express";

import auth_router from './auth.router';
import customer_router from './customer/router';
import admin_router from './admin/router';
import shipper_router from './shipper/router';

const router = Router()

router.use('/auth', auth_router)

router.use('/', customer_router)
router.use('/admin', admin_router)
router.use('/shipper', shipper_router)

export default router;