const mongoose = require("mongoose");
const fs = require("fs");
const productModel = require("../models/product.model");
const SubCategoryModel = require("../models/subCategory.model");
const BusinessModel = require("../models/business.model");
const Business = BusinessModel.Business;
const {
  uploadMultipleImages,
} = require("../middlewares/upload.multiple.image");
const Product = productModel.Product;
const SubCategory = SubCategoryModel.SubCategory;

const getAll = async (req, res) => {
  const product = await Product.find().populate("subCategories").exec();
  return res.status(200).json(product);
};
const getAllApproved = async (req, res) => {
  const product = await Product.find({ isApproved: true })
    .sort({ price: 1 })
    .populate("subCategories")
    .exec();
  return res.status(200).json(product);
};
const getFeatured = async (req, res) => {
  const product = await Product.find({ isApproved: true, new: true })
    .sort({ price: 1 })
    .limit(8)
    .populate("subCategories")
    .exec();
  return res.status(200).json(product);
};
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("subCategories")
    .exec();
  if (product == null) {
    return res.status(404).json("error hapened");
  }
  return res.status(200).json(product);
};
const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(result);
  });
};
const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(
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
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  product._id = new mongoose.Types.ObjectId();

  product.subCategories.forEach(async (subcategory) => {
    const subCategory = await SubCategory.findById(subcategory).exec();
    subCategory.products.push(product._id);
    subCategory.save();
  });
  const business = await Business.findById(product.business).exec();
  business.products.push(product);
  var stocks = 0;
  if (product.variants.length != 0){
    product.variants.forEach((color)=>{
      stocks+= color.stock;
    })
  }
  else{
    stocks = 1;
  }
  product.stocks=stocks;
  business.save();
  var dir = "uploads/product/";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (uploadMultipleImages(req, res) != null) {
    uploadMultipleImages(req, res).forEach((file) => {
      console.log(file);
      product.images.push(dir + file.filename);
    });
  }

  product
    .save()
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
module.exports = {
  getAll,
  getAllApproved,
  getFeatured,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
