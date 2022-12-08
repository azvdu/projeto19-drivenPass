import express, {json} from "express";
import cors from "cors";
import "express-async-errors"
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());


export default app;