import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import app, { init, close } from "../../src/app.js";
import { cleanDb, generateValidToken } from "../helphers.js";
import { createCredential } from "../factories/credentialFactory.js";

beforeAll(async () => {
    await init();
});

// beforeEach(async () => {
//     await cleanDb();
// });

afterAll(async () => {
    await close();
})

const server = supertest(app);

describe("POST /credentials", () => {
    it("should return with status 401 when token is not given", async () => {
        const credential = {
            title: faker.lorem.word(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const result = await server.post("/credentials").send(credential)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 401 when token is invalid", async () => {
        const credential = {
            title: faker.lorem.word(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }
        const token = faker.lorem.word();

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`).send(credential);

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 422 when body is not given", async () => {
        const token = await generateValidToken()

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`);

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return with status 422 when body is invalid", async () => {
        const body = faker.lorem.word()
        const token = await generateValidToken()

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`).send(body)

        expect(result.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should return with status 409 when title already exists", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        await createCredential(token, title)
        const body = {
            title,
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`).send(body)

        expect(result.status).toEqual(httpStatus.CONFLICT)
    });

    it("should return with status 201", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const body = {
            title,
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const result = await server.post("/credentials").set("authorization", `Bearer ${token}`).send(body)

        expect(result.status).toEqual(httpStatus.CREATED)
    });
})

describe("GET /credentials", () => {
    it("should return with status 401 when token is not given", async () => {
        const result = await server.get("/credentials")

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 401 when token is invalid", async () => {
        const token = faker.lorem.word();

        const result = await server.get("/credentials").set("authorization", `Bearer ${token}`)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 400 when credentialId is invalid", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const fakeId = faker.datatype.number()
        await createCredential(token, title)

        const result = await server.get(`/credentials?credentialId=${fakeId}`).set("authorization", `Bearer ${token}`)

        expect(result.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should return with status 401 when the credential does not belong to the user", async () => {
        const token = await generateValidToken()
        const token2 = await generateValidToken()
        const title = faker.lorem.word()
        const credential = await createCredential(token, title)

        const result = await server.get(`/credentials?credentialId=${credential.id}`).set("authorization", `Bearer ${token2}`)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 200 when have a credentialId", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const credential = await createCredential(token, title)

        const result = await server.get(`/credentials?credentialId=${credential.id}`).set("authorization", `Bearer ${token}`)

        expect(result.status).toEqual(httpStatus.OK)
    });

    it("should return with status 200 when no have a credentialId", async () => {
        const token = await generateValidToken()

        const result = await server.get("/credentials").set("authorization", `Bearer ${token}`)

        expect(result.status).toEqual(httpStatus.OK)
    });
});

describe("DELETE /credentials", () => {
    it("should return with status 401 when token is not given", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const credential = await createCredential(token, title)

        const result = await server.delete(`/credentials?credentialId=${credential.id}`)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 401 when token is invalid", async () => {
        const token = await generateValidToken()
        const token2 = faker.lorem.word();
        const title = faker.lorem.word()
        const credential = await createCredential(token, title)

        const result = await server.delete(`/credentials?credentialId=${credential.id}`).set("authorization", `Bearer ${token2}`)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 400 when credentialId is not given", async () => {
        const token = await generateValidToken()

        const result = await server.delete("/credentials").set("authorization", `Bearer ${token}`)

        expect(result.status).toEqual(httpStatus.BAD_REQUEST)
    });

    it("should return with status 400 when credentialId does not exist", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const fakeId = faker.datatype.number()
        await createCredential(token, title)

        const result = await server.delete(`/credentials?credentialId=${fakeId}`).set("authorization", `Bearer ${token}`)

        expect(result.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should return with status 401 when the credential does not belong to the user", async () => {
        const token = await generateValidToken()
        const token2 = await generateValidToken()
        const title = faker.lorem.word()
        const credential = await createCredential(token, title)

        const result = await server.delete(`/credentials?credentialId=${credential.id}`).set("authorization", `Bearer ${token2}`)

        expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should return with status 200", async () => {
        const token = await generateValidToken()
        const title = faker.lorem.word()
        const credential = await createCredential(token, title)

        const result = await server.delete(`/credentials?credentialId=${credential.id}`).set("authorization", `Bearer ${token}`)

        expect(result.status).toEqual(httpStatus.OK)
    });
});
