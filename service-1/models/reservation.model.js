const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Price must be positive"],
  },
  paymentMethod: {
    type: String,
    enum: ["stripe", "paypal"],
    required: false,
  },
  isInProgress: {
    type: Boolean,
    default: true,
  },
  submitCartDay: {
    type: Date,
    required: true,
  },
  listPaid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
