const express = require("express");
const categoryController = require("../controllers/category.controller");
const { uploadMultiple } = require("../middlewares/upload.multiple.image");
const { Authorize } = require("../middlewares/authorization");
const passport = require("passport");
const router = express.Router();

router.get("/", categoryController.getAll);
router.get("/details/:id", categoryController.getCategory);
router.get("/featured", categoryController.getFeatured);
router.post("/create", passport.authenticate("jwt", { session: false }),
Authorize(["SA"]), uploadMultiple, categoryController.createCategory);
router.patch("/edit/:id", passport.authenticate("jwt", { session: false }),
Authorize(["SA"]), categoryController.updateCategory);
router.delete("/delete/:id",passport.authenticate("jwt", { session: false }),
Authorize(["SA"]), categoryController.deleteCategory);

module.exports = router;
