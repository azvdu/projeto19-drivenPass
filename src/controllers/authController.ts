import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

import { Users } from "@prisma/client";
import authServices from "../services/authServices/index.js";

export type CreateAuthType = Omit<Users, "id" | "createdAt" | "updatedAt" >

export async function signUp(req: Request, res: Response){
    const user: CreateAuthType = req.body
    
    if(!user.email || !user.password){
        throw{type: httpStatus.BAD_REQUEST, message: "email or password not filled in"}
    }
    const findUserByEmail = await authServices.findUser(user)
    
    if(findUserByEmail){
        console.log(httpStatus.CONFLICT)
        throw{type: httpStatus.CONFLICT, message: "E-mail already registered"}
    }

    await authServices.createUser(user)
    
    return res.sendStatus(httpStatus.CREATED)
}