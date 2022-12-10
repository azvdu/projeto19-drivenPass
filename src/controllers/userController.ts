import { Request, Response } from "express";
import httpStatus from "http-status";

import { Users } from "@prisma/client";
import userServices from "../services/userServices/index.js";

export type CreateUserType = Omit<Users, "id" | "createdAt" | "updatedAt" >

export async function signUp(req: Request, res: Response){
    const user: CreateUserType = req.body
    const findUserByEmail = await userServices.findUser(user)
    
    if(findUserByEmail){
        throw{type: httpStatus.CONFLICT, message: "E-mail already registered"}
    }

    await userServices.createUser(user)
    
    return res.sendStatus(httpStatus.CREATED)
}