import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import QuoteRoute from "./routes/QuoteRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
// import { db } from "../../database/ConnectSql.js";

dotenv.config();

// (async()=>{
//     await db.sync();
// })()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(QuoteRoute);
app.use(UserRoute);
app.use(AuthRoute);

export default app;