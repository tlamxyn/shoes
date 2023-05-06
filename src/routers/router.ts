import { Router } from "express";

import auth_router from './auth.router';

const router = Router()

console.log()

router.use('/auth', auth_router)

export default router;