const express = require("express");
const subCategoryController = require("../controllers/subCategories.controller");
const { uploadMultiple } = require("../middlewares/upload.multiple.image");
const { Authorize } = require("../middlewares/authorization");
const passport = require("passport");
const router = express.Router();

router.get("/", subCategoryController.getAll);
router.get("/details/:id", subCategoryController.getSubCategory);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  Authorize(["SA"]),
  uploadMultiple,
  subCategoryController.createSubCategory
);
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  Authorize(["SA"]),
  subCategoryController.updateSubCategory
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  Authorize(["SA"]),
  subCategoryController.deleteSubCategory
);

module.exports = router;
