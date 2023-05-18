const mongoose = require("mongoose");
const businessModel = require("../models/business.model");
const fs = require("fs");
const { uploadImages } = require("../middlewares/upload.image");
const Business = businessModel.Business;

const getAll = async (req, res) => {
  const business = await Business.find().sort({ name: 1 }).exec();
  return res.status(200).json(business);
};
const getBusiness = (req, res) => {
  Business.findById(req.params.id, (error, business) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(business);
  });
};

const getFeaturedBusinesses = async (req, res) => {
  const business = await Business.find({
    $or: [{ isPremium: true }, { isPartner: true }],
  })
    .sort({ name: 1 })
    .exec();

  return res.status(200).json(business);
};
const getFeaturedBusinessesLogos = async (req, res) => {
  const business = await Business.find({
    $or: [{ isPremium: true }, { isPartner: true }],
  })
    .sort({ name: 1 })
    .exec();
  const logos = [];
  business.forEach((bus) => {
    if (bus.logo != null) {
      logos.push(bus.logo);
    }
  });
  return res.status(200).json(logos);
};

const getBusinessBy = async (req, res) => {
  const business = await Business.find(req.body).sort({ name: 1 }).exec();
  return res.status(200).json(business);
};

const deleteBusiness = (req, res) => {
  Business.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) return res.status(404).json(error);
    else return res.status(200).json(result);
  });
};
const updateBusiness = (req, res) => {
  Business.findByIdAndUpdate(
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
const createBusiness = (req, res) => {
  const business = new Business(req.body);
  business._id = new mongoose.Types.ObjectId();
  var dir = "uploads/business/";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  Business.exists({ name: req.body.name }, (error, result) => {
    if (error) return res.status(500).json(error);
    if (!result) {
      const file = uploadImages(req, res);
      business.logo = dir + file.filename;

      business
        .save()
        .then((data) => {
          return res.status(201).json(data);
        })
        .catch((error) => {
          console.log(error);
          return res.status(error.code).json(error);
        });
    } else {
      console.log("Business Exists", result);
      return res.status(404).json(result);
    }
  });
};
module.exports = {
  getAll,
  getBusiness,
  getFeaturedBusinesses,
  getFeaturedBusinessesLogos,
  deleteBusiness,
  updateBusiness,
  createBusiness,
  getBusinessBy,
};
