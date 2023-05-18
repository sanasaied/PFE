const mongoose = require("mongoose");
/**

 @typedef {Object} Promotion
 @property {mongoose.Schema.Types.ObjectId} _id - The unique ID of the promotion.
 @property {String} name - The name of the promotion.
 @property {String} description - The description of the promotion.
 @property {Date} startAt - The start date of the promotion.
 @property {Date} endAt - The end date of the promotion.
 @property {Number} value - The value of the promotion.
 @property {Array.<mongoose.Schema.Types.ObjectId>} products - The array of product IDs associated with the promotion.
 */

const promotion = {
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "name field is required",
    },
  },
  description: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "description field is required",
    },
  },
  startAt: { type: Date, isRequired: true, default: Date.now },
  endAt: {
    type: Date,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "end date field is required",
    },
  },
  value: {
    type: Number,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "value field is required",
    },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
};

const promotionSchema = mongoose.Schema(promotion);
const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = { Promotion, promotion };
