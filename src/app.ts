import express, {json, Express} from "express";
import cors from "cors";
import "express-async-errors"
import dotenv from "dotenv";

import { connectDb } from "./config/db.js";
import router from "./routers/index.js"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddlewares.js";

dotenv.config();


const app = express();
app
    .use(cors())
    .use(json())
    .use(router)
    .use(errorHandlerMiddleware)

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export default app;