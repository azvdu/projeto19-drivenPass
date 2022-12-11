import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { credentialSchema } from "../schemas/credentialSchema.js";

export async function validationCredential(req: Request, res: Response, next: NextFunction){
    const credential = req.body;
    const validation = credentialSchema.validate(credential, {abortEarly: false});

    if(validation.error){
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(validation.error.details.map(detail => detail.message))
    }
    next()
}