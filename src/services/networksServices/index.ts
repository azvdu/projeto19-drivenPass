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


const networksServices = {
    createNetwork
}

export default networksServices;