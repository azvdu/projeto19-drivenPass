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

async function findNetworksByuserId(userId: number){
    return prisma.networks.findMany({
        where:{
            userId,
        }
    })
}

async function findNetworksById(id: number){
    return prisma.networks.findFirst({
        where:{
            id,
        }
    })
}


const networkReposiory = {
    createNetwork,
    findNetworksByuserId,
    findNetworksById
}

export default networkReposiory;