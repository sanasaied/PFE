const express = require("express");
const { authenticateJWT } = require("../middlewares/jwt");
const { Authorize } = require("../middlewares/authorization");
const {
  handleValidationErrors,
  userValidation,
  PasswordValidation,
} = require("../middlewares/validate.schema");
const passport = require("passport");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  Authorize(["SA"]),
  userController.getAllUsers
);
router.get(
  "/getUser/:id",
  passport.authenticate("jwt", { session: false }),
  Authorize(["SA", "A"]),
  userController.getUserDetails
);
router.get("/current-user", authController.getCurrentLoggedInUser);
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  authenticateJWT,
  userController.updateUser
);

router.post(
  "/auth/register",
  userValidation,
  handleValidationErrors,
  authController.register
);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.patch("/auth/activate", authController.activateAccount);
router.get("/auth/verify/:id/:code", authController.verifyCode);
router.patch("/auth/reset", authController.resetPassword);
router.patch(
  "/auth/updateResetPassword/:id",
  PasswordValidation,
  handleValidationErrors,
  authController.updateResetPassword
);
router.patch(
  "/auth/updatePassword/:id",
  passport.authenticate("jwt", { session: false }),
  authenticateJWT,
  PasswordValidation,
  handleValidationErrors,
  authController.updatePassword
);

module.exports = router;
