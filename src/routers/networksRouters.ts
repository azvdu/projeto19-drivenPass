import { Router } from "express";
import { createNetwork } from "../controllers/index.js";
import { validationNetwork } from "../middlewares/networkMiddlewares.js";

const networksRouter = Router();
networksRouter
    .post("/networks", validationNetwork, createNetwork)

export default networksRouter;