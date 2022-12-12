import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import app, { init, close } from "../../src/app.js";
import { cleanDb, generateValidToken } from "../helphers.js";

beforeAll(async () => {
    await init();
});

afterAll(async () => {
    await close();
})

const server = supertest(app);

describe("POST /networks", () => {
    it("should return with status 401 when token is not given", async () => {
        const network = {
            title: faker.lorem.word(),
            network: faker.lorem.word(),
            password: faker.internet.password()
        }

        const result = await server.post("/networks").send(network)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 401 when token is invalid", async () => {
        const network = {
            title: faker.lorem.word(),
            network: faker.lorem.word(),
            password: faker.internet.password()
        }
        const token = faker.lorem.word();

        const result = await server.post("/networks").set("authorization", `Bearer ${token}`).send(network);

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 422 when body is not given", async () => {
        const token = await generateValidToken()

        const result = await server.post("/networks").set("authorization", `Bearer ${token}`);

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return with status 422 when body is invalid", async () => {
        const body = faker.lorem.word()
        const token = await generateValidToken()

        const result = await server.post("/networks").set("authorization", `Bearer ${token}`).send(body)

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return with status 201", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const body = {
            title,
            network: faker.lorem.word(),
            password: faker.internet.password()
        }

        const result = await server.post("/networks").set("authorization", `Bearer ${token}`).send(body)

        expect(result.status).toEqual(httpStatus.CREATED)
    });
})
