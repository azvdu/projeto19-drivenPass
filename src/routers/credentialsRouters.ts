import { Router } from "express";
import { validationCredential } from "../middlewares/credentialMiddewares.js";
import { createCredential, deleteCredential, getCredential } from "../controllers/credentialController.js";


const credentialRouters = Router();
credentialRouters
    .post("/credentials", validationCredential, createCredential)
    .get("/credentials", getCredential)
    .delete("/credentials", deleteCredential)

export default credentialRouters;