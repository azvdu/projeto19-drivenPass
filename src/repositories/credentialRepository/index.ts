import { prisma } from "../../config/db.js";
import { CreateCredentialData } from "../../controllers/credentialController.js";

async function findTitle({ title }: CreateCredentialData, userId: number){
    return prisma.credentials.findFirst({
        where: {
            title,
            userId
        }
    })
}

async function create({ title, url, username }: CreateCredentialData, password: string, userId: number){
    return prisma.credentials.create({
        data: {
            title,
            url,
            username,
            password,
            userId
        }
    })
}

async function findCrendentialsByUserId(userId: number){
    return prisma.credentials.findMany({
        where: {
            userId
        }
    })
}

async function findCredentialById(id: number){
    return prisma.credentials.findFirst({
        where:{
            id
        }
    })
}

async function deleteCredential(id: number){
    return prisma.credentials.delete({
        where:{
            id
        }
    })
}

const credentialRepository = {
    findTitle,
    create,
    findCrendentialsByUserId,
    findCredentialById,
    deleteCredential
}


export default credentialRepository;