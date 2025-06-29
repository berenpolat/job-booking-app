const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  position: String,
  company: String,
  city: String,
  country: String,
  town: String,
  workingType: String, // "remote", "hybrid", "on-site"
  description: String,
  postedAt: { type: Date, default: Date.now },
  applications: { type: Number, default: 0 }
});

module.exports = mongoose.model("Job", jobSchema);
