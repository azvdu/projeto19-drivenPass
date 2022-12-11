import { Router } from "express";

import userRouters from "./userRouters.js";
import authRouters from "./authRouters.js";
import credentialRouters from "./credentialsRouters.js";

const router = Router()
    .use(userRouters)
    .use(authRouters)
    .use(credentialRouters)

export default router;