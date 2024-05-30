import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";

dotenv.config();

const app = express();

app.use(express.json())

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