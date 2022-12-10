import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";
import { prisma } from "../../src/config/db.js";

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
