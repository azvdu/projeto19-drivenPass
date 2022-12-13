import app, { init, close } from "../../src/app.js";
import { Users } from "@prisma/client";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/userFactory.js";
import { cleanDb } from "../helphers.js";

export type CreateUserType = Omit<Users, "id" | "createdAt" | "updatedAt">

beforeAll(async () => {
    await init();
    await cleanDb();    
})

afterAll(async () => {
    await close();
});


const server = supertest(app)

describe("POST /sign-up", () => {
    it("should return with status 422 when body is not given", async () => {
        const result = await server.post("/sign-up");
    
        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return status 422 when wrong data is passed", async () => {
        const user: CreateUserType = {
            email: faker.internet.email(),
            password: faker.internet.password(5)
        };
        const result = await server.post("/sign-up").send(user)

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY)
    });
    
    it("should return status 409 when email already exists", async () => {
        const { email, password } = await createUser();
        const user: CreateUserType = {
            email,
            password: faker.internet.password(10)
        };
        const result = await server.post("/sign-up").send(user)
        
        expect(result.status).toEqual(httpStatus.CONFLICT)
    });

    it("should return status 201 when body is valid", async () => {
        const user: CreateUserType = {
            email: faker.internet.email(),
            password: faker.internet.password(10)
        };

        const result = await server.post("/sign-up").send(user)
        
        expect(result.status).toEqual(httpStatus.CREATED)
    })
})