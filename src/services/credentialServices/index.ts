import httpStatus from "http-status";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

import { verifyToken } from "../../utils/authUtils.js";
import { CreateCredentialData } from "../../controllers/credentialController.js";
import credentialRepository from "../../repositories/credentialRepository/index.js";

async function createCredential(createCredential: CreateCredentialData, token: string){
    const authorization = await verifyToken(token)

    const title = await credentialRepository.findTitle(createCredential, authorization.userId)
    if(title){
        throw{type: httpStatus.CONFLICT, message: "this title has already been assigned to another credential"}
    }

    const encrypt = cryptr.encrypt(createCredential.password);

    const create = await credentialRepository.create(createCredential, encrypt , authorization.userId)

    return create;

}


async function getCredentials(token: string) {
    const authorization = await verifyToken(token)

    const findCrendentialsByUserId = await credentialRepository.findCrendentialsByUserId(authorization.userId)

    return findCrendentialsByUserId;
}


async function getCredentialsById(token: string, id: number){
    const authorization = await verifyToken(token)

    const findCredentialById = await credentialRepository.findCredentialById(id)

    if(!findCredentialById){
        throw{type: httpStatus.BAD_REQUEST, message: "this credential does not exists"}
    }

    if(authorization.userId !== findCredentialById.userId){
        throw{type: httpStatus.UNAUTHORIZED, message: "this credential does not belong to this user"}
    }

    return findCredentialById
}


async function deleteCredential(id: number, token: string){
    const authorization = await verifyToken(token)
    
    const findCredentialById = await credentialRepository.findCredentialById(id)
    
    if(!findCredentialById){
        throw{type: httpStatus.BAD_REQUEST, message: "this credential does not exist"}
    }

    if(findCredentialById.userId !== authorization.userId){
        throw{type: httpStatus.UNAUTHORIZED, message: "this credential belongs to another user"}
    }

    const deleteCredential = await credentialRepository.deleteCredential(id)

    return deleteCredential;
}


const credentialServices = {
    createCredential,
    getCredentials,
    getCredentialsById,
    deleteCredential
}

export default credentialServices;