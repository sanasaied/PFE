const express = require("express");
const adsController = require("../controllers/ads.controller");
const { uploadMultiple } = require("../middlewares/upload.multiple.image");
const router = express.Router();

router.get("/all", adsController.getAll);
router.get("/", adsController.getShown);
router.get("/FeaturedGold", adsController.getFeaturedGold);
router.get("/FeaturedSilver", adsController.GetFeaturedSilver);
router.post("/create", uploadMultiple, adsController.createAd);
router.patch("/edit", adsController.updateAd);
router.delete("/delete", adsController.deleteAd);

module.exports = router;
