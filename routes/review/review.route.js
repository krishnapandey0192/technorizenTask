import express from "express";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../../controller/review/review.controller.js";
import { authenticateVerifier } from "../../middleware/authorization.js";

const router = express.Router();

router.post("/books/:bookId/reviews", authenticateVerifier, createReview);

router.put("/books/:bookId/reviews/:id", authenticateVerifier, updateReview);
router.delete("/books/:bookId/reviews/:id", authenticateVerifier, deleteReview);

export default router;
