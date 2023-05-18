const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

/**
 * @typedef {Object} User
 * @property {mongoose.Schema.Types.ObjectId} _id - User ID
 * @property {string} fullName - User's full name
 * @property {string} phoneNumber - User's phone number
 * @property {string} email - User's email
 * @property {string} password - User's password
 * @property {string} gender - User's gender
 * @property {Date} birthday - User's date of birth
 * @property {string} image - User's profile image
 * @property {boolean} isActive - User's active status
 * @property {number} resetCode - User's reset code
 * @property {string} role - User's role (SuperAdmin, Admin, or Customer)
 * @property {boolean} isInfluencer - User's influencer status
 * @property {number} credit - User's credit amount
 * @property {number} point - User's points
 * @property {string} promoCode - User's promotional code
 */

const user = {
  _id: mongoose.Schema.Types.ObjectId,
  fullName: {
    type: String,
    isRequired: true,
  },

  phoneNumber: { type: String, isRequired: false, notEmpty: true },
  email: {
    type: String,
    isRequired: true,
    unique: true,
  },
  password: {
    type: String,
    isRequired: true,
  },
  gender: { type: String, enum: ["Homme", "Femme", "Autre"], isRequired: true },
  birthday: { type: Date, isRequired: true },
  image: { type: String },
  isActive: { type: Boolean, default: false },
  resetCode: { type: Number },
  role: { type: String, enum: ["SA", "A", "C"], default: "C" },
  isInfluencer: { type: Boolean, default: false },
  credit: { type: Number, default: 0 },
  point: { type: Number, default: 0 },
  promoCode: { type: String },
  referralCode: {type: String},
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
};

userSchema = mongoose.Schema(user);
userSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.password; // Remove password field from JSON representation of object
  }
};


userSchema.pre("save", async function () {
  if (this.password) {
    const salt = await bcrypt.genSalt(10); //process.env.SALT_ENCRYPTION);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User, user };
