import { Router } from "express";
import authRouters from "./authRouters.js";

const router = Router()
    .use(authRouters)


export default router;