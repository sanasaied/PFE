const mongoose = require("mongoose");
const sliderModel = require("../models/slider.model");
const {uploadMultipleImages} = require("../middlewares/upload.multiple.image");
const Slider = sliderModel.Slider;

const createSlider = async (req, res) => {
    const slider = new Slider(req.body);
    slider._id = new mongoose.Types.ObjectId();
    uploadMultipleImages(req, res).forEach((file) => {
        console.log(file);
        slider.images.push(file.destination + file.filename);
    });
    slider.save()
        .then((data) => {
            return res.status(201).json(data);
        })
        .catch((error) => {
            return res.status(error.code).json(error);
        });
};

const getAll = async (req, res) => {
    const slider = await Slider.find().exec();
    return res.status(200).json(slider);
};
const getShown = async (req, res) => {
    const slider = await Slider.find({isHidden: false}).exec();
    return res.status(200).json(slider);
}
const deleteSlider = async (req, res) => {
    Slider.remove({_id: req.body.id}, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};

module.exports = {
    getAll, getShown, deleteSlider, createSlider
};