import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/db.js";
import { decodingToken } from "./authFactory.js";


export async function createNetwork(token: string, title: string){
    const { userId } = await decodingToken(token)
    return prisma.networks.create({
        data: {
            userId: userId,
            title: title,
            network: faker.lorem.word(),
            password: faker.internet.password(),
        }
    })
}