import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    reviewedBy: {
      type: String,
      required: true,
      default: "Guest",
    },
    reviewedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
