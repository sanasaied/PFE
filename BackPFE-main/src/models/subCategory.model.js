const mongoose = require("mongoose");

const subCategory = {
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
      isRequired: false,
    },
  ],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"}
};
const subCategorySchema = mongoose.Schema(subCategory);

const SubCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = { subCategory, SubCategory };
