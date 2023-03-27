// const customerAddRental
const Location = require("../models/location.model");
const User = require("../models/user.model");
const asyncHandler = require("../middlewares/async");
const Car = require("../models/car.model");
const Error = require("../utils/appError");

const addLocation = asyncHandler(async (req, res) => {
  const { clientId, carId } = req.body;

  const car = await Car.findById(carId);

  if (car.isRental) {
    throw new Error("Car is already rented");
  }

  const currentDate = new Date();
  const date1 = new Date(req.body.dateBegin);
  const date2 = new Date(req.body.dateEnd);

  if (date1.getTime() < currentDate.getTime()) {
    throw new Error("Please pick a date after today");
  }

  if (date1.getTime() >= date2.getTime()) {
    throw new Error("The end date must be superior than the begin date");
  }

  console.log(req.body.dateBegin);
  console.log(req.body.dateEnd);

  const locationToCreate = {
    idUser: clientId,
    idCar: carId,
    dateBegin: req.body.dateBegin,
    dateEnd: req.body.dateEnd,
  };

  const user = await User.findById(clientId);

  for (const iterator of user.panier) {
    const location = await Location.findById(iterator._id);
    if (location.idCar == locationToCreate.idCar) {
      throw new Error("Car is already in cart");
    }
  }

  const locationCreate = await Location.create(locationToCreate);

  user.panier.push(locationCreate._id);
  await user.save();
  res.status(201).json({
    success: true,
    data: locationCreate,
  });
});

const deleteLocation = asyncHandler(async (req, res) => {
  const { clientId, locationId } = req.params;
  const user = await User.findById(clientId);

  if (!user.panier.includes(locationId)) {
    throw new Error("Location is not in cart");
  }
  user.panier.pull(locationId);

  await user.save();
  const deleted = await Location.findByIdAndDelete(locationId);

  console.log(deleted);
  if (deleted) {
    return res.status(200).send({
      success: true,
      message: "Location is deleted well",
      user: user,
    });
  }
  throw new Error("Location not found");
});

module.exports = {
  addLocation,
  deleteLocation,
};
