import { Credentials } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";

import credentialServices from "../services/credentialServices/index.js";

export type CreateCredentialData = Omit <Credentials, "id" | "userId" | "createdAt" | "updatedAt">

export async function createCredential(req: Request, res: Response){
    const { authorization } = req.headers;
    const token: string = authorization?.replace("Bearer ", "");
    const credential: CreateCredentialData = req.body; 

    const createCredential = await credentialServices.createCredential(credential, token);
    
    return res.status(httpStatus.CREATED).send(createCredential);
}


export async function getCredential(req: Request, res: Response){
    const { authorization } = req.headers;
    const token: string = authorization?.replace("Bearer ", "");
    const credentialId = req.query.credentialId;

    if(credentialId === undefined || !credentialId || credentialId === null){
        const getCredential = await credentialServices.getCredentials(token)

        return res.status(httpStatus.OK).send(getCredential)
    }

    const getCredentialId = await credentialServices.getCredentialsById(token, Number(credentialId))

    return res.status(httpStatus.OK).send(getCredentialId)
}