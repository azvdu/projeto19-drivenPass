import * as jwt from "jsonwebtoken";
import { Users } from "@prisma/client";

import { createUser } from "./factories/userFactory.js";
import { prisma } from "../src/config/db.js";

export async function cleanDb(){
    await prisma.credentials.deleteMany({});
    await prisma.networks.deleteMany({});
    await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: Users){
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

    return token;
}