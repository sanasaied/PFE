const express = require("express");
const feedbackController = require("../controllers/feedbacks.controller");
const { Authorize } = require("../middlewares/authorization");
const passport = require("passport");
const router = express.Router();

router.get("/", feedbackController.getAll);
router.get('/:id', feedbackController.getFeedback);
router.get("/productFeedbacks/:id", feedbackController.getProductFeedbacks);
router.post('/create', feedbackController.createFeedback); // add passport.authenticate("jwt", { session: false })
router.patch("/edit/:id", feedbackController.editFeedback);
router.delete("/delete/:id", feedbackController.deleteFeedback);

module.exports = router;