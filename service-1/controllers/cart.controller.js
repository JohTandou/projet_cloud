const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Car = require("../models/car.model");
const Location = require("../models/location.model");
const Payment = require("../models/payment.model");
const Reservation = require("../models/reservation.model");
const Error = require("../utils/appError");

const getCartContent = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const user = await User.findById(clientId);

  const cart = user.panier;

  const locations = await Location.find({ _id: cart });

  if (!locations) {
    throw new Error("Locations not found");
  }

  const cars = [];
  let amount = 0;
  for (const location of locations) {
    const car = await Car.findById(location.idCar);
    const duration = Math.ceil(
      Math.abs(location.dateEnd - location.dateBegin) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = car.price * duration;
    amount += totalPrice;
    cars.push({
      car,
      dateBegin: location.dateBegin.toLocaleDateString().split("T")[0],
      dateEnd: location.dateEnd.toLocaleDateString().split("T")[0],
    });
  }

  const userEmail = user.email;

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
    message: "Cart cleared",
    data: user.panier,
  });
});

const submitCartToReservation = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const { numero, dateExpiration, cryptogramme } = req.body;

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

  if (user.panier.length == 0) {
    throw new Error("Your cart is empty");
  }

  for (const iterator of user.panier) {
    const location = Location.findById(iterator);
    const car = Car.findById(location.idCar);

    if (!car) {
      throw new Error(
        `The car with id "${location.idCar}" no longer exists. Please remove it from your cart before submitting it`
      );
    }

    if (car.isRental) {
      throw new Error(
        `The car "${car.name}" is no longer available. Please remove it from your cart before submitting it`
      );
    }
  }

  // if (!clientId.paymentType) {
  //   throw new Error("You need to add a credit card");
  // }

  // if (!clientId.creditCard) {
  //   throw new Error("You need to add a credit card");
  // }

  user.paymentsCreditCard = paymentSave._id;

  const cars = [];

  let amount = 0;

  for (const iterator of user.panier) {
    const location = await Location.findById(iterator._id);

    const car = await Car.findByIdAndUpdate(location.idCar, { isRental: true });

    const duration = Math.ceil(
      Math.abs(location.dateEnd - location.dateBegin) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = car.price * duration;
    cars.push(car);
    amount += totalPrice;
  }
  let currentDate = new Date();

  const reservation = new Reservation({
    client: clientId,
    amount: amount,
    paymentMethod: user.paymentMethod,
    submitCartDay: currentDate.toLocaleDateString().split("T")[0],
    isInProgress: true,
    listPaid: user.panier,
  });
  await reservation.save();

  user.panier = [];
  await user.save();
  res.status(200).json({
    success: true,
    data: reservation,
    message: `Successful payment. An email will be sent to your inbox (${user.email}) containing all information about your reservation`,
  });
});

module.exports = {
  getCartContent,
  clearCartcontent,
  submitCartToReservation,
};
