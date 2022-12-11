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
    console.log(password)
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


const credentialRepository = {
    findTitle,
    create
}


export default credentialRepository;