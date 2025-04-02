import Review from "../../model/review/review.schema.js";
import Book from "../../model/book/book.model.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createReview = async (req, res) => {
  try {
    const { bookId, reviewedBy, rating, review } = req.body;

    if (!bookId || !rating) {
      return sendResponse(
        res,
        false,
        400,
        "Book ID and rating are required",
        null
      );
    }

    const book = await Book.findById(bookId);
    if (!book || book.isDeleted) {
      return sendResponse(res, false, 404, "Book not found", null);
    }

    const newReview = new Review({
      bookId,
      reviewedBy: reviewedBy || "Guest",
      rating,
      review,
    });
    const createdReview = await newReview.save();

    return sendResponse(
      res,
      true,
      201,
      "Review created successfully",
      createdReview
    );
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

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, false, 400, "Review ID is required", null);
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedReview || updatedReview.isDeleted) {
      return sendResponse(res, false, 404, "Review not found", null);
    }

    return sendResponse(
      res,
      true,
      200,
      "Review updated successfully",
      updatedReview
    );
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

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, false, 400, "Review ID is required", null);
    }

    const deletedReview = await Review.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedReview) {
      return sendResponse(res, false, 404, "Review not found", null);
    }

    return sendResponse(
      res,
      true,
      200,
      "Review deleted successfully",
      deletedReview
    );
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
