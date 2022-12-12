import { Networks } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";

import networksServices from "../services/networksServices/index.js";

export type createNetworkData = Omit <Networks, "id" | "userId" | "createdAt" | "updatedAt">

export async function createNetwork(req: Request, res: Response){
    const { authorization } = req.headers;
    const token: string = authorization?.replace("Bearer ", "");
    const network: createNetworkData = req.body;

    const createNetwork = await networksServices.createNetwork(network, token);

    return res.status(httpStatus.CREATED).send(createNetwork);
}