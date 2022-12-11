import { Router } from "express";

import { signUp } from "../controllers/userController.js";
import { validationSignUp } from "../middlewares/userMiddleware.js";


const userRouters = Router();
userRouters
    .post("/sign-up", validationSignUp ,signUp)

export default userRouters;