const mongoose = require("mongoose");
const fs = require("fs");
const categoryModel = require("../models/category.model");
const {
  uploadMultipleImages,
} = require("../middlewares/upload.multiple.image");
const Category = categoryModel.Category;

const getAll = async (req, res) => {
  const category = await Category.find()
    .sort({ name: 1 })
    .populate("subCategories")
    .exec();
  return res.status(200).json(category);
};
const getFeatured = async (req, res) => {
  const category = await Category.find().sort({ name: 1 }).limit(6).exec();
  return res.status(200).json(category);
};

const getCategory = async (req, res) => {
  Category.findById(req.params.id, (error, category) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(category);
  });
};
const updateCategory = async (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnOriginal: false,
    },
    (error, result) => {
      if (error) return res.status(error.code).json(error);
      else return res.status(200).json(result);
    }
  );
};
const deleteCategory = async (req, res) => {
  Category.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(result);
  });
};
const createCategory = async (req, res) => {
  const category = new Category(req.body);
  category._id = new mongoose.Types.ObjectId();
  var dir = "uploads/category/";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  Category.exists({ name: req.body.name }, (error, result) => {
    if (error) return res.status(500).json(error);
    if (!result) {
      uploadMultipleImages(req, res).forEach((file) => {
        console.log(file);
        category.images.push(dir + file.filename);
      });
      category
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

const createSubCategory = async (req, res) => {
  Category.findOneAndUpdate(req.body.id, {
    $addToSet: {
      subCategories: [
        {
          name: req.body.name,
          image: req.body.image,
          _id: new mongoose.Types.ObjectId(),
        },
      ],
    },
  }).then((error, result) => {
    if (error) return res.status(error.code).json(error);
    return res.status(201).json(result);
  });
};
const deleteSubCategory = async (req, res) => {};
const updateSubCategory = async (req, res) => {
  Category.findOneAndUpdate(req.body.id, {
    $set: {
      subCategories: [
        {
          name: req.body.name,
          image: req.body.image,
        },
      ],
    },
  }).then((error, result) => {
    if (error) return res.status(error.code).json(error);
    return res.status(201).json(result);
  });
};

module.exports = {
  getAll,
  getCategory,
  getFeatured,
  createCategory,
  updateCategory,
  deleteCategory,
};
