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

export async function getNetworks(req: Request, res: Response){
    const { authorization } = req.headers;
    const token: string = authorization?.replace("Bearer ", "");
    const networkId = req.query.networkId;

    if(networkId === undefined || !networkId || networkId === null){
        const getNetworksId = await networksServices.getNetworks(token)

        return res.status(httpStatus.OK).send(getNetworksId)
    }

    const getNetworkId = await networksServices.getNetworksById(token, Number(networkId))

    return res.status(httpStatus.OK).send(getNetworkId)
}

export async function deleteNetwork(req: Request, res: Response){
    const { authorization } = req.headers;
    const token: string = authorization?.replace("Bearer ", "");
    const networkId = req.query.networkId;

    if(networkId === undefined || !networkId || networkId === null){
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    const deleteNetwork = await networksServices.deleteNetwork(Number(networkId), token);

    return res.status(httpStatus.OK).send(deleteNetwork);
}