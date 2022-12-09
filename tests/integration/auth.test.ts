import app, { init } from "../../src/app.js";
import { prisma } from "../../src/config/db.js";
import { Users } from "@prisma/client";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser, userFake } from "../factories/authFactory.js";
import { cleanDb } from "../helphers.js";

export type CreayeAuthType = Omit<Users, "id" | "createdAt" | "updatedAt">

beforeAll(async () => {
    await init();
})

beforeEach(async () => {
    await cleanDb();
})

const server = supertest(app)

describe("POST /sign-up", () => {
    it("should return status 422 when wrong data is passed", async () => {
        const user: CreayeAuthType = {
            email: faker.internet.email(),
            password: faker.internet.password(5)
        };
        const result = await supertest(app).post("/sign-up").send(user)

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY)
        expect(result.body).toEqual([ '"password" length must be at least 10 characters long' ])
    });
    it("should return status 409 when email already exists", async () => {
        const { email, password } = await createUser();
        const user: CreayeAuthType = {
            email,
            password: faker.internet.password(10)
        };
        const result = await supertest(app).post("/sign-up").send(user)
        
        console.log(result.body)
        expect(result.status).toEqual(httpStatus.CONFLICT)
    });

    it("should return status 201 when body is valid", async () => {
        const user = await userFake()

        const result = await supertest(app).post("/sign-up").send(user)
        
        console.log(result.body)
        expect(result.status).toEqual(httpStatus.CREATED)
    })
})