const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/upload.image");
const { Authorize } = require("../middlewares/authorization");
const passport = require("passport");


const businessController = require("../controllers/business.controller");

router.get("/", businessController.getAll);
router.get("/filter", businessController.getBusinessBy);
router.get("/featured", businessController.getFeaturedBusinesses);
router.get("/featuredLogos", businessController.getFeaturedBusinessesLogos);
router.get("/details/:id", businessController.getBusiness);
router.delete("/delete/:id",passport.authenticate("jwt", { session: false }),
Authorize(["SA"]), businessController.deleteBusiness);
router.patch("/edit/:id", passport.authenticate("jwt", { session: false }),
Authorize(["SA", "A"]),businessController.updateBusiness);
router.post(
  "/create",
  upload.single("logo"),passport.authenticate("jwt", { session: false }),
  Authorize(["SA"]),
  // validate(checkSchema(business)),
  businessController.createBusiness
);

module.exports = router;
