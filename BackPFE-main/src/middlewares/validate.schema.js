const { check, validationResult } = require("express-validator");

const userValidation = [
  check("fullName")
    .exists()
    .withMessage("fullName is required")
    .isLength({ min: 3 })
    .withMessage("wrong fullname length"),

  check("email")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email not valid"),

  check("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("wrong password length")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{5,}$/)
    .withMessage(
      "Password should contain at least 5 characters with  one uppercase letter, one lowercase letter and one number"
    ),
];
const PasswordValidation = [
  check("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("wrong password length")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{5,}$/)
    .withMessage(
      "Password should contain at least 5 characters with  one uppercase letter, one lowercase letter and one number"
    ),
]

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
}

module.exports = { handleValidationErrors, userValidation, PasswordValidation };
