import { Router } from "express";
import { signIn } from "../controllers/index.js";
import { validationSignIn } from "../middlewares/authMiddlewares.js";

const authRouters = Router();
authRouters
    .post("/sign-in", validationSignIn ,signIn)


export default authRouters;