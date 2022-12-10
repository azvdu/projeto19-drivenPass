import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";
import { prisma } from "../../src/config/db.js";
import { CreateUserType } from "../integration/user.test.js";

export async function createUser(params: Partial<Users> = {}): Promise<Users> {
    const incomingPassword = params.password || faker.internet.password(15);
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return prisma.users.create({
        data: {
            email:params.email || faker.internet.email(),
            password: hashedPassword
        },
    });
}

export async function userFake(){
    const user: CreateUserType = {
        email: faker.internet.email(),
        password: faker.internet.password(10)
    }
    return user
}