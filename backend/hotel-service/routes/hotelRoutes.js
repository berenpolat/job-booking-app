const express = require("express");
const router = express.Router();
const controller = require("../controllers/hotelController");

router.get("/", controller.searchHotels);
router.post("/", controller.addHotel);
router.get("/:id", controller.getHotelById);
router.post("/:id/book", controller.bookHotel);

module.exports = router;
