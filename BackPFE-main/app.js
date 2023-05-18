const express = require("express");
var app = express();
let passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const user = require("./src/models/user.model");
const User = user.User;
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// enable CORS for all routes
app.use(
  cors({
    origin: [process.env.FRONT_LOCALHOST, process.env.FRONT_LOCALHOST_ADDRESS, process.env.FRONT_STAGING],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
  })
);

// connect to database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Successfully connected to MongoDB.");
});

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

app.use(express.static("out"));
app.use("/doc", express.static("out"));

app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  done(null, false);
});

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromHeader("access_token"),
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      const user = await User.findById(payload.userId);
      if (user) return done(null, user);
      return done("requested user not found", false);
    }
  )
);
app.use(function (req, res, next) {
  res.locals.req = req;
  next();
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromHeader("access_token"),
        passReqToCallback: true,
      },
      async (req, payload, done) => {
        console.log(payload);
        const user = await User.findById(payload.userId);
        if (user) return done(null, user);
        return done("requested user not found", false);
      }
    )
  );
});
app.use(function (req, res, next) {
  res.locals.req = req;
  next();
});

const router = require("./src/routes/index.route");
app.use("/api", router);

module.exports = app;
