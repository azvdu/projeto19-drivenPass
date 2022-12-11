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


const credentialServices = {
    createCredential
}

export default credentialServices;