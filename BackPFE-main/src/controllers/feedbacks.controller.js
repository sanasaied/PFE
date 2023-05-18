const mongoose = require("mongoose");
const feedbackModel = require("../models/feedback.model");
const userModel = require("../models/user.model");
const User = userModel.User;
const productModel = require("../models/product.model");
const Product = productModel.Product;
const Feedback = feedbackModel.Feedback;

const getAll = async (req, res) => {
  const feedback = await Feedback.find().sort({ stars: 1 }).exec();
  return res.status(200).json(feedback);
};
const getFeedback = async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (feedback) {
    return res.status(200).json(feedback);
  } else {
    return res.status(404).json({ message: "feedback not found" });
  }
};

const getProductFeedbacks = async (req, res) => {
  const feedback = await Feedback.findOne({ product: req.params.id });
  if (feedback) {
    return res.status(200).json(feedback);
  } else {
    return res.status(404).json({ message: "feedback not found" });
  }
};

const createFeedback = async (req, res) => {
  let feedback = new Feedback(req.body);
  feedback._id = new mongoose.Types.ObjectId();
  const product = await Product.findById(req.body.product);
  if (product) {
    product.feedbacks.push(feedback._id);
    feedback
      .save()
      .then((data) => {
        console.log(data);
        product.save();
        return res.status(201).json(data);
      })
      .catch((error) => {
        console.log(error);
        return res.status(error.code).json(error);
      });
  } else {
    res.status(404).json("product not found");
  }
};
const deleteFeedback = (req, res) => {
  Feedback.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(result);
  });
};
const editFeedback = (req, res) => {
  Feedback.findByIdAndUpdate(
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

module.exports = {
  getAll,
  getFeedback,
  getProductFeedbacks,
  createFeedback,
  editFeedback,
  deleteFeedback,
};
