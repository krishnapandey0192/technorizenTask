import { sendResponse } from "../../utils/sendResponse.js";
import Book from "../../model/book/book.model.js";
import User from "../../model/user/user.model.js";

// create book api
export const createBook = async (req, res) => {
  try {
    const { title, userId, ISBN, category, subcategory } = req.body;
    if ((!title || !userId || !ISBN || !category, !subcategory)) {
      return sendResponse(res, false, 400, "All fields are required", null);
    }
    const book = new Book({
      title,
      userId,
      ISBN,
      category,
      subcategory,
      releasedAt: new Date(req.body.releasedAt),
      reviews: 0,
      isDeleted: false,
      deletedAt: null,
    });
    const existUser = await User.findById(userId);
    if (!existUser) {
      return sendResponse(res, false, 400, "User does not exist", null);
    }

    const newBook = await book.save();
    return sendResponse(res, true, 201, "Book created successfully", newBook);
  } catch (error) {
    return sendResponse(
      res,
      false,
      500,
      "Internal Server Error",
      error.message
    );
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const { userId, category, subcategory } = req.query;
    const filter = { isDeleted: false };
    if (userId) filter.userId = userId;
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    const books = await Book.find(filter).sort({ title: 1 });
    if (!books || books.length === 0) {
      return sendResponse(res, false, 404, "No books found", null);
    }

    return sendResponse(res, true, 200, "Books fetched successfully", books);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, false, 400, "Book ID is required", null);
    }

    const book = await Book.findById(id);
    if (!book || book.isDeleted) {
      return sendResponse(res, false, 404, "Book not found", null);
    }
    return sendResponse(res, true, 200, "Book fetched successfully", book);
  } catch (error) {
    return sendResponse(
      res,
      false,
      500,
      "Internal Server Error",
      error.message
    );
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, false, 400, "Book ID is required", null);
    }
    const book = await Book.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!book || book.isDeleted) {
      return sendResponse(res, false, 404, "Book not found", null);
    }
    return sendResponse(res, true, 200, "Book updated successfully", book);
  } catch (error) {
    return sendResponse(
      res,
      false,
      500,
      "Internal Server Error",
      error.message
    );
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendResponse(res, false, 400, "Book ID is required", null);
    }
    const book = await Book.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!book) {
      return sendResponse(res, false, 404, "Book not found", null);
    }
    return sendResponse(res, true, 200, "Book deleted successfully", book);
  } catch (error) {
    return sendResponse(
      res,
      false,
      500,
      "Internal Server Error",
      error.message
    );
  }
};
