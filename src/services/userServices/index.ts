import bcrypt from "bcrypt";

import { CreateUserType } from "../../controllers/userController.js";
import userReposity from "../../repositories/userRepository/index.js";

async function findUser(user: CreateUserType){
    const findUserByEmail = await userReposity.findUserByEmail(user)
    
    return findUserByEmail;
}

async function createUser(user: CreateUserType){
    const SALT = Number(process.env.SALT);
    const passwordCrypt = bcrypt.hashSync(user.password, SALT);

    const createUser = await userReposity.createUser({... user, password: passwordCrypt})
    return createUser
}

const userServices = {
    findUser,
    createUser
}

export default userServices;