import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/db.js";
import { decodingToken } from "./authFactory.js";


export async function createCredential(token: string, title: string){
    const { userId } = await decodingToken(token)
    return prisma.credentials.create({
        data: {
            userId: userId,
            title: title,
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password(),

        }
    })
}