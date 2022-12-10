import bcrypt from "bcrypt";

import { CreateUserType } from "../../controllers/userController.js";
import authReposity from "../../repositories/userRepository/index.js";

async function findUser(user: CreateUserType){
    const findUserByEmail = await authReposity.findUserByEmail(user)
    
    return findUserByEmail;
}

async function createUser(user: CreateUserType){
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