const Car = require("../models/car.model");
const asyncHandler = require("../middlewares/async");
const Error = require("../utils/appError");
const User = require("../models/user.model");
const Reservation = require("../models/reservation.model");
const Location = require("../models/location.model");

const createCar = asyncHandler(async (req, res) => {
  const { adminemail } = req.params;
  const user = await User.findOne({ email: adminemail });
  if (user.isAdmin) {
    if (
      !req.body.name ||
      !req.body.price ||
      !req.body.categories ||
      !req.body.immatriculation
    ) {
      throw new Error("Missing required fields");
    }
    const car = await Car.create(req.body);
    res.status(201).json({ success: true, data: car });
  } else {
    throw new Error("User is not an admin");
  }
});

const userIsRegistered = asyncHandler(async (req, res) => {
  const { adminemail, username } = req.params;
  const findAdmin = await User.findOne({ email: adminemail });

  if (findAdmin.isAdmin) {
    const user = await User.findOne({ name: username });
    if (user) {
      res.status(200).json({
        success: true,
        message: `Client with mail ${user.email} is registered`,
      });
    }

    res.status(404).json("User with the specified email does not exists");
  } else {
    throw new Error("User is not an admin");
  }
});

const carIsAvailable = asyncHandler(async (req, res) => {
  const { adminemail, carId } = req.params;
  const admin = await User.findOne({ adminemail });
  const car = await Car.findOne({ _id: carId });
  if (admin.isAdmin) {
    res.status(200).json({ success: true, car });
  } else {
    throw new Error("User is not an admin");
  }
});

const getAllReservations = asyncHandler(async (req, res) => {
  const { adminemail, clientId } = req.params;
  const admin = await User.findOne({ adminemail });
  console.log(admin);
  const user = await User.findById(clientId);
  if (admin.isAdmin) {
    const reports = await Reservation.find({ client: user._id });
    res.status(200).json({
      success: true,
      message: `Report of ${user.email}`,
      data: reports,
    });
  } else {
    throw new Error("User is not an admin");
  }
});

const getOneReservation = asyncHandler(async (req, res) => {
  const { adminemail, reservationId } = req.params;
  const admin = await User.findOne({ adminemail });
  const reservation = await Reservation.findById(reservationId);
  if (admin.isAdmin) {
    if (reservation) {
      res.status(200).json({
        success: true,
        data: reservation,
      });
    }
    res.status(404).json("Reservation with the specified id does not exists");
  } else {
    throw new Error("User is not an admin");
  }
});

const updateReservationAndCarStatus = asyncHandler(async (req, res) => {
  const { adminemail } = req.params;
  const admin = await User.findOne({ adminemail });
  let isReservationFinished = true;
  const currentDate = new Date();

  if (admin.isAdmin) {
    const reservations = await Reservation.find();

    if (!reservations) {
      throw new Error("There is no existing reservation");
    }
    for (const iterator of reservations) {
      const locations = iterator.listPaid;

      for (const iterator2 of locations) {
        const location = await Location.findById(iterator2);

        if (location.dateEnd < currentDate) {
          isReservationFinished = false;
        } else {
          const car = await Car.findByIdAndUpdate(location.idCar, {
            isRental: false,
          });
        }
      }
      if (isReservationFinished) {
        const reservation = await Reservation.findByIdAndUpdate(iterator._id, {
          isInProgress: false,
        });
      }
    }
    res.status(200).json({
      success: true,
      message:
        "Success. All reservations and cars status (isInProgress/isRental) are up to date",
    });
  } else {
    throw new Error("User is not an admin");
  }
});

module.exports = {
  createCar,
  userIsRegistered,
  carIsAvailable,
  getAllReservations,
  getOneReservation,
  updateReservationAndCarStatus,
};
