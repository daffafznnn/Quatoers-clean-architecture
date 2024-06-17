import express from "express";
import UsersController from "../controllers/UsersController.js";
import { adminOnly, verifyUser } from "../middlewares/AuthUser.js";

const router = express.Router();

router.post("/api/v1/user/create", verifyUser, adminOnly, UsersController.createUser);

export default router;