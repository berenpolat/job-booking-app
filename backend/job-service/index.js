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
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/v1/jobs", require("./routes/jobRoutes"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Job service running on port ${port}`);
});
