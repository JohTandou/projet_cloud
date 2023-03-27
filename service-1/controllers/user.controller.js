const User = require("../models/user.model");
const Payment = require("../models/payment.model");
const Location = require("../models/location.model");
const Car = require("../models/car.model");
const Reservation = require("../models/reservation.model");
const asyncHandler = require("express-async-handler");
const Error = require("../utils/appError");

const createOneUser = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    throw new Error("Missing required fields");
  }
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: {
      user,
    },
  });
});

// get information of individual user
const getOneUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ name: username });

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      payments: user.payments,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    throw new Error("Users not found");
  }

  res.status(200).json({
    success: true,
    numberOfUsers: users.length,
    data: {
      users,
    },
  });
});

const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (
    req.body.paymentMethod != "stripe" &&
    req.body.paymentMethod != "paypal"
  ) {
    throw new Error("Please specify payment method (stripe or paypal)");
  }
  const userToPatch = await User.findByIdAndUpdate(userId, {
    paymentMethod: req.body.paymentMethod,
  });

  if (!userToPatch) {
    throw new Error("User not found");
  }
  const userPatched = await User.findById(userId);
  res.status(200).json({
    success: true,
    data: {
      userPatched,
    },
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const deleted = await User.findByIdAndDelete(userId);

  if (!deleted) {
    throw new Error("User not found");
  }
  res.status(200).json({
    success: true,
    data: {
      deleted,
      message: "User deleted",
    },
  });
});

const addLocationToCart = asyncHandler(async (req, res) => {
  const { idUser, idLocation } = req.body;
  const user = await User.findById(idUser);

  const location = await Location.findById(idLocation);
  if (!location) {
    throw new Error("Location not found");
  }

  await user.panier.push(location);

  if (user.panier.includes(location)) {
    res.status(200).json({
      success: true,
      msg: "Location added to cart",
      data: user.panier,
    });
  }
});

const getCartContent = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const user = await User.findById(clientId);
  if (user) {
    const cart = user.panier;
    if (cart.length === 0) {
      res.status(200).json({
        success: true,
        data: {
          user: user.email,
          cars: 0,
        },
      });
    }

    const locations = await Location.find({ _id: cart });
    const cars = [];
    let amount = 0;
    for (const location of locations) {
      const car = await Car.findById(location.idCar);
      amount += car.price;
      cars.push(car);
    }
    const userEmail = user.email;
    console.log(userEmail);
    res.status(200).json({
      success: true,
      data: {
        user: userEmail,
        amount: amount,
        cars: cars,
        dateBegin: locations.dateBegin,
        dateEnd: locations.dateEnd,
      },
    });
  }
  throw new Error("User not found");
});

const clearCartcontent = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const user = await User.findById(clientId);

  if (!user) {
    throw new Error("User not found");
  }
  user.panier = [];
  await user.save();
  res.status(200).json({
    success: true,
    data: user.panier,
  });
});

const submitCartToReservation = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const { numero, dateExpiration, cryptogramme, payments } = req.body;

  const newPayment = new Payment({
    numero: numero,
    dateExpiration: dateExpiration,
    cryptogramme: cryptogramme,
  });

  const paymentSave = await newPayment.save();

  const user = await User.findById(clientId);

  if (!user) {
    throw new Error("User not found");
  }

  // if (payments !== "stripe" || payments !== "paypal") {
  //   throw new Error("You need to choose a payment method : stripe or paypal");
  // }

  // if (!clientId.panier) {
  //   throw new Error("Your cart is empty");
  // }

  // if (!clientId.paymentType) {
  //   throw new Error("You need to add a credit card");
  // }

  // if (!clientId.creditCard) {
  //   throw new Error("You need to add a credit card");
  // }

  user.paymentsCreditCard = paymentSave._id;

  user.payments = payments;

  const cars = [];

  const panier = user.panier;
  for (const iterator of panier) {
    const location = await Location.findById(iterator._id);

    const car = await Car.findById(location.idCar);
    cars.push(car);
    car.isRental = true;
  }

  const amount = cars.reduce((acc, car) => acc + car.price, 0);

  const reservation = new Reservation({
    client: clientId,
    amount: amount,
    paymentProvider: payments,
    submitCartDay: new Date(),
    isInProgress: true,
    listPaid: panier.map((car) => car._id),
  });

  user.panier = [];
  await user.save();
  res.status(200).json({
    success: true,
    data: reservation,
  });
});

const deleteAllUser = asyncHandler(async (req, res) => {
  const users = await User.deleteMany();

  res.status(200).json(users);
});

module.exports = {
  createOneUser,
  getOneUser,
  getAllUsers,
  getCartContent,
  addLocationToCart,
  clearCartcontent,
  submitCartToReservation,
  updatePaymentMethod,
  deleteUser,
  deleteAllUser,
};
