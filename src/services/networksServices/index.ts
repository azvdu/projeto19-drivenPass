import httpStatus from "http-status";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

import { verifyToken } from "../../utils/authUtils.js";
import { createNetworkData } from "../../controllers/networksController.js";
import networkReposiory from "../../repositories/networkRepository/index.js";

async function createNetwork(network:  createNetworkData, token: string){
    const authorization = await verifyToken(token);

    const encrypt = cryptr.encrypt(network.password);

    const create = await networkReposiory.createNetwork(network, encrypt, authorization.userId)

    return create;
}

async function getNetworks(token: string){
    const authorization = await verifyToken(token);

    const findNetworksByuserId = await networkReposiory.findNetworksByuserId(authorization.userId);

    const networkDecrypt = findNetworksByuserId.map((network) => ({
        ...network, password: cryptr.decrypt(network.password)
    }))

    return networkDecrypt;
}

async function getNetworksById(token: string, id: number){
    const authorization = await verifyToken(token)

    const findNetworksById = await networkReposiory.findNetworksById(id)

    if(!findNetworksById){
        throw{type: httpStatus.BAD_REQUEST, message: "this network does not exist"}
    }

    if(authorization.userId !== findNetworksById.userId){
        throw{type: httpStatus.UNAUTHORIZED, message: "this network does not belong to this user"}
    }

    return findNetworksById;
}


const networksServices = {
    createNetwork,
    getNetworks,
    getNetworksById
}

export default networksServices;