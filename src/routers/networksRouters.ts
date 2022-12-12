import { Router } from "express";
import { createNetwork, deleteNetwork, getNetworks } from "../controllers/index.js";
import { validationNetwork } from "../middlewares/networkMiddlewares.js";

const networksRouter = Router();
networksRouter
    .post("/networks", validationNetwork, createNetwork)
    .get("/networks", getNetworks)
    .delete("/networks", deleteNetwork)

export default networksRouter;