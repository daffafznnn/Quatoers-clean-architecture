import express from "express";
import QuoteController from "../controllers/QuoteController.js";
import { verifyUser } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/api/v1/quote/:userId", QuoteController.findQuoteByUser);
router.post("/api/v1/quote/create", verifyUser, QuoteController.createQuote);

export default router;