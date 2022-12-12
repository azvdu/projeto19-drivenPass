import { Router } from "express";

import userRouters from "./userRouters.js";
import authRouters from "./authRouters.js";
import credentialRouters from "./credentialsRouters.js";
import networksRouter from "./networksRouters.js";

const router = Router()
    .use(userRouters)
    .use(authRouters)
    .use(credentialRouters)
    .use(networksRouter)

export default router;