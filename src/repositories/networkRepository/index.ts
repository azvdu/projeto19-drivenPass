import { prisma } from "../../config/db.js";

import { createNetworkData } from "../../controllers/networksController.js";

async function createNetwork({title, network}: createNetworkData, password: string, userId: number){
    return prisma.networks.create({
        data:{
            title,
            network,
            password,
            userId
        }
    })
}


const networkReposiory = {
    createNetwork
}

export default networkReposiory;