import express from "express";
import UsersController from "../controllers/UsersController.js";
import { adminOnly, verifyUser } from "../middlewares/AuthUser.js";

const router = express.Router();

router.post("/api/v1/user/create", verifyUser, adminOnly, UsersController.createUserForAdmin);
router.post("/api/v1/auth/register", UsersController.register);
router.post("/api/v1/auth/login", UsersController.login);

export default router;