import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import app, { init } from "../../src/app.js";
import { CreateUserType } from "./user.test.js";
import { createUser } from "../factories/userFactory.js";
import { cleanDb, generateValidToken } from "../helphers.js";
import { createCredential } from "../factories/credentialFactory.js";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe("POST /credentials", () => {
    it("should return with status 401 when token is not given", async () => {
        const result = await server.post("/credentials")

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 401 when token is invalid", async () => {
        const token = faker.lorem.word();

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`);

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 422 when body is not given", async () => {
        const token = await generateValidToken()

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`);

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return with status 422 when body is invalid", async () => {
        const token = await generateValidToken()
        const body = faker.lorem.word

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`).send(body)

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return with status 409 when title already exists", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const credential = await createCredential(token, title)

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`).send(title)

        expect(result.status).toEqual(httpStatus.CONFLICT)
    })
})