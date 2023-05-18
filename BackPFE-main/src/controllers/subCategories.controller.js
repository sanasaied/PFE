const mongoose = require("mongoose");
const fs = require("fs");
const subCategoryModel = require("../models/subCategory.model");
const categoryModel = require("../models/category.model");
const Category = categoryModel.Category;
const {
  uploadMultipleImages,
} = require("../middlewares/upload.multiple.image");
const SubCategory = subCategoryModel.SubCategory;

const getAll = async (req, res) => {
  const subCategory = await SubCategory.find().sort({ name: 1 }).exec();
  return res.status(200).json(subCategory);
};

const getSubCategory = async (req, res) => {
  SubCategory.findById(req.params.id, (error, subCategory) => {
    if (error) return res.status(404).json(error);
    else return res.status(200).json(subCategory);
  });
};
const updateSubCategory = async (req, res) => {
  SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnOriginal: false,
    },
    (error, result) => {
      if (error) return res.status(404).json(error);
      else return res.status(200).json(result);
    }
  );
};
const deleteSubCategory = async (req, res) => {
  SubCategory.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) return res.status(404).json(error);
    else return res.status(200).json(result);
  });
};
const createSubCategory = async (req, res) => {
  let subCategory = new SubCategory(req.body);
  subCategory._id = new mongoose.Types.ObjectId();
  const category = await Category.findById(subCategory.category).exec();
  category.subCategories.push(subCategory);
  category.save();
  var dir = "uploads/SubCategory/";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  SubCategory.exists({ name: req.body.name }, (error, result) => {
    if (error) return res.status(500).json(error);
    if (!result) {
      uploadMultipleImages(req, res).forEach((file) => {
        console.log(file);
        subCategory.images.push(dir + file.filename);
      });
      subCategory
        .save()
        .then((data) => {
          console.log(data);
          return res.status(201).json(data);
        })
        .catch((error) => {
          console.log(error);
          return res.status(error.code).json(error);
        });
    } else {
      return res.status(404).json(result);
    }
  });
};

module.exports = {
  getAll,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
