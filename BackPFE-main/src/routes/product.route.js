const express = require("express");
const productController = require("../controllers/product.controller");
const { uploadMultiple } = require("../middlewares/upload.multiple.image");
const { Authorize } = require("../middlewares/authorization");
const passport = require("passport");
const router = express.Router();

router.get("/all", productController.getAll);
router.get("/featured", productController.getFeatured);
router.get("/", productController.getAllApproved);
router.get("/details/:id", productController.getProduct);
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }),
Authorize(["A"]),productController.deleteProduct);
router.post("/create",passport.authenticate("jwt", { session: false }),
Authorize(["A"]),  uploadMultiple, productController.createProduct);
router.patch("/update/:id",passport.authenticate("jwt", { session: false }),
Authorize(["A", "SA"]), productController.updateProduct);
module.exports = router;
