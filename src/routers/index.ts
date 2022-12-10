import { Router } from "express";
import authRouters from "./userRouters.js";

const router = Router()
    .use(authRouters)


export default router;