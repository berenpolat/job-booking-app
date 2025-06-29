const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const startHotelCapacityChecker = require("./jobs/hotelCapacityChecker");
const startJobAlertNotifier = require("./jobs/jobAlertNotifier");
const startReservationListener = require("./jobs/reservationQueueListener");

// İki ayrı DB bağlantısı (Hotel ve Job için)
const hotelConnection = mongoose.createConnection(process.env.MONGO_HOTEL_URL);
const jobConnection = mongoose.createConnection(process.env.MONGO_JOB_URL);

// Başlat
hotelConnection.once("open", () => {
  console.log("Connected to Hotel DB");
  startHotelCapacityChecker(hotelConnection);
});
jobConnection.once("open", () => {
  console.log("Connected to Job DB");
  startJobAlertNotifier();
});

startReservationListener(process.env.RABBITMQ_URL)
  .then(() => console.log("Reservation Queue listener started"))
  .catch(err => console.error("RabbitMQ error:", err));
