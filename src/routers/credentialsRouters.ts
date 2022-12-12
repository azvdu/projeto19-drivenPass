import { Router } from "express";
import { createCredential, getCredential } from "../controllers/credentialController.js";
import { validationCredential } from "../middlewares/credentialMiddewares.js";


const credentialRouters = Router();
credentialRouters
    .post("/credentials", validationCredential, createCredential)
    .get("/credentials", getCredential)

export default credentialRouters;