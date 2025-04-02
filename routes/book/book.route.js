import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../../controller/book/book.controller.js";
import { authenticateVerifier } from "../../middleware/authorization.js";

const router = express.Router();

router.post("/books", authenticateVerifier, createBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.put("/books/:id", authenticateVerifier, updateBook);
router.delete("/books/:id", authenticateVerifier, deleteBook);

export default router;
