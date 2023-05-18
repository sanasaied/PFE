const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const sendmail = require("../utils/sendmail.js");
const crypto = require("crypto");
const omit = require("just-omit");
const User = userModel.User;

const { generateJwtToken } = require("../middlewares/jwt");
require("dotenv").config();

function generateReferralCode() {
  const hash = crypto.randomBytes(20).toString("hex");
  const timestamp = Date.now().toString();
  console.log(timestamp);
  return hash.slice(0, 6);
}

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "No user with this email" });
  } else {
    const verified = bcrypt.compareSync(req.body.password, user.password);
    if (verified) {
      if (user.isActive) {
        const token = generateJwtToken(user);
        return res
          .header("access_token", token)
          .status(200)
          .send({ token: token, user: user.toJSON() });
      } else return res.status(401).json({ message: "not active" });
    } else {
      return res.status(404).json({ message: "incorrect password" });
    }
  }
};
const register = async (req, res) => {
  const { referredBy, ...userData } = req.body; // Use object destructuring to remove password field

  const user = new User(userData);
  user._id = new mongoose.Types.ObjectId();
  const activationCode = Math.floor(Math.random() * (999999 - 100001)) + 100000;
  user.resetCode = activationCode;
  user.referralCode = generateReferralCode();
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: userData.email,
    subject: "[Tinar] - Activate your account",
    text: "Activation code : " + activationCode,
  };
  User.exists({ email: userData.email }, async (error, result) => {
    if (error) return res.status(error.code).json(error);
    if (!result) {
      const referree = await User.findOne({ referralCode: referredBy });
      if (referree) {
        referree.referredUsers.push(user._id);
        referree.save().catch((err) => {
          console.log(err);
          return res
            .status(err.code)
            .json({ error: err, message: "User cannot be saved" });
        });
        user
          .save()
          .then((data) => {
            console.log(data);
            // must send mail here !
            sendmail(mailOptions);
            return res.status(201).json(data);
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(err.code)
              .json({ error: err, message: "User cannot be saved" });
          });
      } else {
        res.status(404).json({ message: "No user with such referral code" });
      }
    } else {
      console.log("User Exists", result);
      return res
        .status(404)
        .json({ error: result, message: "User already exists" });
    }
  });
};
const activateAccount = (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) return res.status(500).json(error);
    console.log(user);
    if (user) {
      if (user.resetCode === req.body.code) {
        User.findOneAndUpdate(
          { email: req.body.email },
          { $set: { isActive: true } },
          {
            returnOriginal: false,
          },
          (error, result) => {
            if (error) {
              return res.status(404).json(error);
            }
            return res.status(200).json(result);
          }
        );
      } else {
        return res.status(404).json({ message: "Incorrect activation code!" });
      }
    } else {
      return res.status(404).json({ message: "User Not Found!" });
    }
  });
};
const resetPassword = async (req, res) => {
  const code = Math.floor(Math.random() * (999999 - 100001)) + 100000;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: req.body.email,
    subject: "[Tinar] - Activate your account",
    text: "Activation code : " + code,
  };
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        resetCode: code, //Math.floor(Math.random() * (999999 - 100001)) + 100000,
      },
    },
    {
      returnOriginal: false,
    },
    (error, result) => {
      if (error) {
        return res.status(404).json({ message: "User not found" });
      }
      sendmail(mailOptions);
      return res.status(200).json({ resetCode: code, id: result._id });
    }
  );
};
const verifyCode = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.resetCode == req.params.code) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "Invalid code" });
    }
  }
  return res.status(404).json("user not found");
};
const updateResetPassword = async (req, res) => {
  const result = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        password: await bcrypt.hash(
          req.body.password,
          await bcrypt.genSalt(10)
        ),
      },
    },
    {
      returnOriginal: false,
    }
  );
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "User not found" });
};
const updatePassword = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "No user was found" });
  } else {
    const verified = bcrypt.compareSync(req.body.oldPassword, user.password);
    if (verified) {
      User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: await bcrypt.hash(
              req.body.password,
              await bcrypt.genSalt(10)
            ),
          },
        },
        (error, result) => {
          if (error) {
            return res.status(error.code).json(error);
          }
          return res.status(200).json(result);
        }
      );
    } else {
      return res.status(401).send({ message: "incorrect old password" });
    }
  }
};
const getCurrentLoggedInUser = (req, res) => {
  const token = req.headers["access_token"];
  if (!token) {
    return res.status(401).json("Erreur: No Logged In user yet");
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // The token is invalid or has expired
      console.error("Invalid token");
      return res.status(400).send("Invalid Token");
    }
    return res.status(200).send(decoded);
  });
  //return res.status(200).send(req.user);
};

const logout = (req, res) => {
  res.setHeader("access_token", ""); // clear token from headers
  res.sendStatus(200).send("Successfully logged out");
};
module.exports = {
  register,
  login,
  activateAccount,
  resetPassword,
  verifyCode,
  updatePassword,
  updateResetPassword,
  getCurrentLoggedInUser,
  logout,
};
