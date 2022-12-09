import { prisma } from "../../config/db.js";
import { CreateAuthType } from "../../controllers/authController.js";


async function findUserByEmail({ email }: CreateAuthType){
    return prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

async function createUser({ email, password }: CreateAuthType){
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