import express from "express";
import AuthController from "../controllers/AuthController.js";
import { verifyUser } from "../middlewares/AuthUser.js";

const router = express.Router();

router.post("/api/v1/auth/register", AuthController.register);
router.post("/api/v1/auth/login", AuthController.login);
router.post("/api/v1/auth/token", AuthController.refreshToken);
router.post("/api/v1/auth/logout", verifyUser, AuthController.logout);

export default router;