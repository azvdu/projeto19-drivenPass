import { Router } from "express";
import { createNetwork, getNetworks } from "../controllers/index.js";
import { validationNetwork } from "../middlewares/networkMiddlewares.js";

const networksRouter = Router();
networksRouter
    .post("/networks", validationNetwork, createNetwork)
    .get("/networks", getNetworks)

export default networksRouter;