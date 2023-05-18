const mongoose = require("mongoose");

/**
 * Business object.
 * @typedef {Object} BusinessSchema
 * @property {mongoose.Schema.Types.ObjectId} _id The unique identifier of the business.
 * @property {String} name The name of the business.
 * @property {Number} phone The phone number of the business.
 * @property {String} website The website of the business.
 * @property {String} email The email address of the business.
 * @property {String} logo The URL of the logo of the business.
 * @property {String} banner The URL of the banner of the business.
 * @property {Boolean} isActive Whether the business is active or not.
 * @property {Boolean} isPremium Whether the business is premium or not.
 * @property {Boolean} isPartner Whether the business is a partner or not.
 * @property {mongoose.Schema.Types.ObjectId[]} products The IDs of the products associated with the business.
 */

const business = {
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "name field is required",
    },
  },
  phone: {
    type: Number,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "phone field is required",
    },
  },
  website: { type: String },
  email: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "email field is required",
    },
    unique: true,
    isEmail: { bail: true, errorMessage: "invalid email format" },
  },
  logo: { type: String },
  banner: { type: String },
  isActive: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  isPartner: { type: Boolean, default: false },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
};

const businessSchema = mongoose.Schema(business);

const Business = mongoose.model("Business", businessSchema);

module.exports = { Business, business };
