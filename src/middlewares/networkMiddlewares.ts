import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { networkSchema } from "../schemas/networkSchemas.js";

export async function validationNetwork(req: Request, res: Response, next: NextFunction){
    const network = req.body;
    const validation = networkSchema.validate(network, {abortEarly: false});

    if(validation.error){
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(validation.error.details.map(detail => detail.message))
    }
    next()
}