const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateJwtToken = (user) => {
  const payload = {
    userId: user._id,
    userName: user.fullName,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
const authenticateJWT = (req, res, next) => {
  const token = req.headers.access_token;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token is invalid or expired
      }
      req.user = user;
      if (req.user.userId != req.params.id) {
        return res.sendStatus(401);
      }
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

module.exports = { generateJwtToken, authenticateJWT };
