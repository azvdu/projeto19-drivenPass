import { prisma } from "../../config/db.js";
import { CreateUserType } from "../../controllers/userController.js";


async function findUserByEmail({ email }: CreateUserType){
    return prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

async function createUser({ email, password }: CreateUserType){
    return prisma.users.create({
        data: {
            email,
            password
        }
    })
}

const authReposity = {
    findUserByEmail,
    createUser
}

export default authReposity;