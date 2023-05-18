const mongoose = require("mongoose");

/**
 * Feedback object.
 * @typedef {Object} FeedbackSchema
 * @property {string} _id - The ID of the feedback.
 * @property {string} message - The feedback message.
 * @property {number} stars - The feedback rating in stars.
 * @property {string} creator - The ID of the user who created the feedback.
 * @property {string} product - The ID of the product that the feedback belongs to.
 */

const feedback = {
  _id: mongoose.Schema.Types.ObjectId,
  message: { type: String },
  stars: { type: Number },
  creator: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  product: { ref: "Product", type: mongoose.Schema.Types.ObjectId },
};

const feedbackSchema = mongoose.Schema(feedback);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback, feedback };
