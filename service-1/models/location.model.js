const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idCar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  dateBegin: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
