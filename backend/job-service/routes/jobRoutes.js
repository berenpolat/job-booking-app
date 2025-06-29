const express = require("express");
const router = express.Router();
const controller = require("../controllers/jobController");

router.get("/", controller.getAllJobs);
router.post("/", controller.addJob);
router.get("/:id", controller.getJobById);
router.post("/:id/apply", controller.applyToJob);

module.exports = router;
