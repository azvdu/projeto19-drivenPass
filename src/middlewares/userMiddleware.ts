import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { signUpSchema } from "../schemas/authSchemas.js";

export async function validationSignUp(req: Request, res: Response, next: NextFunction){
    const user = req.body
    const validation = signUpSchema.validate(user, {abortEarly: false});

    if(validation.error){
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(validation.error.details.map(detail => detail.message));
    }
    next()
}