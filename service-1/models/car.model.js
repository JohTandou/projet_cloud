const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be positive"],
  },
  immatriculation: {
    type: String,
    required: true,
    match: [/^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/, "Invalid format"],
    unique: true,
  },
  categories: {
    type: String,
    enum: [
      "Coupé",
      "Break",
      "SUV",
      "Targa",
      "Crossover",
      "Minibus",
      "Fourgonnette",
      "Citadine",
      "Sportive",
      "Berline",
      "4x4",
      "Monospace",
    ],
    required: [
      true,
      "Please add a category : Coupé, Break, SUV, Targa, Crossover, Minibus, Fourgonnette, Citadine, Sportive, Berline, 4x4, or Monospace",
    ],
  },
  isRental: {
    type: Boolean,
    default: false,
  },
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
