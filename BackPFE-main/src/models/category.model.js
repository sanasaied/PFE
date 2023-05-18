const mongoose = require("mongoose");

/**
 * Category object.
 * @typedef {object} CategorySchema
 * @property {mongoose.Types.ObjectId} _id - The unique identifier for the category.
 * @property {string} name.required - The name of the category.
 * @property {string[]} images.required - The images of the category.
 * @property {SubCategory[]} subCategories - The sub-categories of the category.
 */

/**
 * Sub-category object.
 * @typedef {object} SubCategory
 * @property {mongoose.Types.ObjectId} _id - The unique identifier for the sub-category.
 * @property {string} name.required - The name of the sub-category.
 * @property {string[]} images.required - The images of the sub-category.
 * @property {mongoose.Types.ObjectId[]} products - The products in the sub-category.
 */

const category = {
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "name field is required",
    },
  },
  images: [
    {
      type: String,
      isRequired: true,
      notEmpty: {
        negated: false,
        errorMessage: "image field is required",
      },
    },
  ],
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "subCategory" }],
};

const categorySchema = mongoose.Schema(category);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category, category };
