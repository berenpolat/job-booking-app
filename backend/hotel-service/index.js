const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/v1/hotels", require("./routes/hotelRoutes"));

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Hotel service running on port ${port}`);
});
