import { Router } from "express";
import { createCredential } from "../controllers/credentialController.js";
import { validationCredential } from "../middlewares/credentialMiddewares.js";


const credentialRouters = Router();
credentialRouters
    .post("/credentials", validationCredential ,createCredential)
    // .get("/credentials", )

export default credentialRouters;