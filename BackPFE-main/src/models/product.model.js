const mongoose = require("mongoose");
const { Category } = require("./category.model");
/**

 Possible sizes of the product.
 @readonly
 @enum {string}
 @memberof module:models/product
 */
const sizes = {
  XXXS: "XXXS",
  XXS: "XXS",
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  XXXL: "XXXL",
};
/**

 @typedef {Object} VariationSize
 @property {string} name - The size name. Should be one of the sizes enum.
 @property {number} stock - The quantity of this size in the stock.
 */
/**

 @typedef {Object} Variation
 @property {mongoose.Types.ObjectId} _id - The unique identifier of the variation.
 @property {string} color - The color of the variation.
 @property {VariationSize[]} size - The array of sizes available for this variation.
 */
/**

 @typedef {Object} Product
 @property {mongoose.Types.ObjectId} _id - The unique identifier of the product.
 @property {string} name - The name of the product.
 @property {number} price - The price of the product.
 @property {mongoose.Types.ObjectId} promotion - The promotion related to this product.
 @property {boolean} new - Indicates if the product is new.
 @property {mongoose.Types.ObjectId[]} feedbacks - The feedbacks related to this product.
 @property {number} saleCount - The amount of times the product has been sold.
 @property {mongoose.Types.ObjectId} category - The category of the product.
 @property {string[]} tag - The array of tags related to the product.
 @property {Variation[]} variation - The array of variations available for the product.
 @property {string} description - The description of the product.
 @property {string[]} images - The array of URLs of the product's images.
 @property {boolean} isHidden - Indicates if the product is hidden.
 @property {boolean} isApproved - Indicates if the product is approved.
 @property {boolean} isSponsored - Indicates if the product is sponsored.
 @property {Date} updatedAt - The date of the last update of the product.
 @property {number} point - The point of the product.
 @property {mongoose.Types.ObjectId} business - The business related to the product.
 */
/**
 Mongoose schema for the Product model.
 @type {mongoose.Schema<Product>}
 @const
 @namespace ProductSchema
 @memberof module:models/product
 */

const product = {
  _id: mongoose.Schema.Types.ObjectId,
  sku: { type: String },
  name: {
    type: String,
    isRequired: true,
  },
  price: {
    type: Number,
    isRequired: true,
  },
  discount: { type: Number, default: 0 },
  offerEnd: { type: String },
  rating: { type: Number, default: 0 },
  promotion: {
    isRequired: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promotion",
  },
  new: { type: Boolean, default: true },
  feedbacks: [
    {
      ref: "Feedback",
      type: mongoose.Schema.Types.ObjectId,
      isRequired: false,
    },
  ],
  saleCount: { type: Number, default: 0 },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "subCategory" }],
  tag: [{ type: String }],
  // colors: [{_id: mongoose.Schema.Types.ObjectId, color: {type: String}, stock: {type: Number, default: 1}}],
  variants: 
  [{
      color: { type: String },
      stock: { type: Number, default: 1 },
      sizes: [
        {
          size: { type: String, enum: sizes },
          stock: { type: Number },
        },
      ],
    }]
,
  stocks: { type: Number, default: 1 },
  description: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "description field is required",
    },
  } /*quantity: {
      type: Number,
      isRequired: true,
      notEmpty: {
        negated: false,
        errorMessage: "quantity field is required",
      },
      isNumeric: true,
      errorMessage: "please enter a number",
    },*/,

  images: [
    {
      type: String,
      isRequired: true,
      notEmpty: {
        negated: false,
        errorMessage: "image field is required",
      },
    },
  ], // viewsNumber: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  isSponsored: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  point: { type: Number },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
};

const productSchema = mongoose.Schema(product);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, product };
