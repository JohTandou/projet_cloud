const Car = require("../models/car.model");
const asyncHandler = require("../middlewares/async");

const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();
  res.status(200).json({
    success: true,
    numberOfData: cars.length,
    data: cars,
  });
});

const getCarByCriteria = asyncHandler(async (req, res) => {
  const cars = await Car.find(req.query);
  res.status(200).json({
    success: true,
    numberOfData: cars.length,
    data: cars,
  });
});

const getAvailableCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ isRental: false });
  res.status(200).json({
    success: true,
    numberOfData: cars.length,
    data: cars,
  });
});

const deleteOneCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: car,
  });
});

const deleteAllCars = asyncHandler(async (req, res) => {
  const cars = await Car.deleteMany();
  res.status(200).json({
    success: true,
    numberOfData: cars.length,
  });
});

module.exports = {
  getCars,
  getCarByCriteria,
  getAvailableCars,
  deleteAllCars,
  deleteOneCar,
};
