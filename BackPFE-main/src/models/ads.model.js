const mongoose = require("mongoose");
/**
 * Ads object.
 * @typedef {Object} AdsSchema
 * @property {mongoose.Schema.Types.ObjectId} _id The unique identifier of the ad.
 * @property {Boolean} isHidden Whether the ad is hidden or not.
 * @property {String[]} images The URLs of the images associated with the ad.
 * @property {String} kind The kind of ad (Gold, Silver, or Bronze).
 */
const ads = {
  _id: mongoose.Schema.Types.ObjectId,
  isHidden: { type: Boolean, default: true },
  images: [{ type: String, isRequired: true }],
  kind: {
    type: String,
    enum: ["Gold", "Silver", "Bronze"],
  },
};

const adsSchema = mongoose.Schema(ads);

const Ads = mongoose.model("Ads", adsSchema);

module.exports = { Ads, ads };
