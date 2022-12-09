import { signUp } from "../controllers/index.js";
import { Router } from "express";
import { validationSignUp } from "../middlewares/authMiddleware.js";


const authRouters = Router();
authRouters
    .post("/sign-up", validationSignUp ,signUp)

export default authRouters;