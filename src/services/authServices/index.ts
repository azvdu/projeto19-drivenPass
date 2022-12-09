import httpStatus from "http-status";
import bcrypt from "bcrypt";

import { CreateAuthType } from "../../controllers/authController.js";
import authReposity from "../../repositories/authRepository/index.js";

async function findUser(user: CreateAuthType){
    const findUserByEmail = await authReposity.findUserByEmail(user)
    
    return findUserByEmail;
}

async function createUser(user: CreateAuthType){
    const SALT = Number(process.env.SALT);
    const passwordCrypt = bcrypt.hashSync(user.password, SALT);

    const createUser = await authReposity.createUser({... user, password: passwordCrypt})
    console.log(createUser)
    return createUser
}

const authServices = {
    findUser,
    createUser
}

export default authServices;