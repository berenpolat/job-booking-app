const Hotel = require("../models/Hotel");

// Tüm otelleri listele (filtrelenebilir)
exports.searchHotels = async (req, res) => {
  const { city, startDate, endDate, people } = req.query;

  const allHotels = await Hotel.find({ "location.city": city });

  const availableHotels = allHotels.filter(hotel => {
    const overlapping = hotel.reservations.find(r =>
      (new Date(startDate) < new Date(r.endDate) && new Date(endDate) > new Date(r.startDate))
    );
    return !overlapping && hotel.capacity >= people;
  });

  res.json(availableHotels);
};

// Yeni otel ekle
exports.addHotel = async (req, res) => {
  const hotel = new Hotel(req.body);
  await hotel.save();
  res.status(201).json(hotel);
};

// Otel rezervasyonu yap
exports.bookHotel = async (req, res) => {
  const { startDate, endDate, people } = req.body;
  const hotel = await Hotel.findById(req.params.id);
  
  hotel.reservations.push({ startDate, endDate, people });
  hotel.capacity -= people;
  await hotel.save();

  res.json({ message: "Hotel booked!" });
};

// Otel detaylarını getir
exports.getHotelById = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
};
