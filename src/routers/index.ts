import { Router } from "express";

import authRouters from "./authRouters.js";
import userRouters from "./userRouters.js";

const router = Router()
    .use(userRouters)
    .use(authRouters)


export default router;