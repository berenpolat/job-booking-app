const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  location: {
    city: String,
    country: String
  },
  rating: Number,
  pricePerNight: Number,
  amenities: [String],
  capacity: Number,
  reservations: [
    {
      startDate: Date,
      endDate: Date,
      people: Number
    }
  ]
});

module.exports = mongoose.model("Hotel", hotelSchema);
