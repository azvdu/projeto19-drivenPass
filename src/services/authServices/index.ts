import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import { CreateUserType } from "../../controllers/userController.js";
import userReposity from "../../repositories/userRepository/index.js";


async function signIn(user: CreateUserType){
    const userData = await userReposity.findUserByEmail(user)
    if(!userData){
        throw{type: httpStatus.UNAUTHORIZED, message: "invalid email"}
    }

    const auth = bcrypt.compareSync(user.password, userData.password);
    if(!auth){
        throw{type: httpStatus.UNAUTHORIZED, message: "incorrect password"}
    }
    
    const token = jwt.sign({userId: userData.id}, process.env.JWT_SECRET);
    return token;
}


const authServices = {
    signIn
};

export default authServices;