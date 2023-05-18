const mongoose = require("mongoose");
/**
 * Mongoose schema for a slider.
 * @typedef {Object} SliderSchema
 * @property {mongoose.Types.ObjectId} _id - The unique ID for the slider.
 * @property {boolean} isHidden - Whether the slider is hidden or not.
 * @property {Array<string>} images - Array of image URLs for the slider.
 */
const slider = {
  _id: mongoose.Schema.Types.ObjectId,
  isHidden: { type: Boolean, default: true },
  images: [{ type: String, isRequired: true }],
  link: {
    type: String,
  },
};

const sliderSchema = mongoose.Schema(slider);

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = { Slider, slider };
