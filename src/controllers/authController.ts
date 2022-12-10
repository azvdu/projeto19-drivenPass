import { Request, Response } from "express";
import httpStatus from "http-status";

import authServices from "../services/authServices/index.js";
import { CreateUserType } from "./userController.js";

export async function signIn(req: Request, res: Response){
    const user: CreateUserType = req.body
    const signIn = await authServices.signIn(user)

    return res.status(httpStatus.OK).send(signIn)
}