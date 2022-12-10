import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { cleanDb } from "../helphers.js";
import app, { init } from "../../src/app.js";
import { createUser } from "../factories/userFactory.js";
import { CreateUserType } from "../integration/user.test.js";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe("POST /sign-in", () => {
    it("should return with status 422 when body is not given", async () => {
        const result = await server.post("/sign-in");

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return with status 422 when the email format is invalid", async () => {
        const user: CreateUserType = {
            email: faker.lorem.word(),
            password: faker.internet.password(10)
        };
        const result = await server.post("/sign-in").send(user)

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY)
    });

    it("should return with status 401 when email is invalid", async () => {
        const user: CreateUserType = {
            email: faker.internet.email(),
            password: faker.internet.password(10)
        };

        const result = await server.post("/sign-in").send(user)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
    });

    it("should return with status 401 when password is incorrect", async () => {
        const user: CreateUserType = {
            email: faker.internet.email(),
            password: faker.internet.password(10)
        };
        await createUser(user);
        
        const result = await server.post("/sign-in").send({... user, password: faker.internet.password(11)})

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
    });

    it("should return with status 200", async () => {
        const user: CreateUserType = {
            email: faker.internet.email(),
            password: faker.internet.password(10)
        };
        await createUser(user);

        const result = await server.post("/sign-in").send(user)

        expect(result.status).toEqual(httpStatus.OK);
    })
})