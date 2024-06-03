import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import db from "./config/database.js";
import QuoteRoute from "./routes/QuoteRoute.js";
import UserRoute from "./routes/UserRoute.js";

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

const PORT = process.env.PORT

app.listen(PORT, async () => {
  console.log(`Server Running Up And Running On Port ${PORT}`);
   try {
     await db.authenticate();
     console.log('Database Connected...');
  } catch (error) {
     console.error('Error connecting to the database:', error);
  }
});