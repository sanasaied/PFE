const express = require("express");
const { slider } = require("../models/slider.model");
const sliderController = require("../controllers/slider.controller");
const {uploadMultiple} = require("../middlewares/upload.multiple.image");

const router = express.Router();

router.get('/all', sliderController.getAll);
router.get('/', sliderController.getShown);
router.post("/create", uploadMultiple, sliderController.createSlider);

module.exports = router;