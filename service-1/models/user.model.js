const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z- ]+$/, "Name must only contain letters and dash"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  paymentMethod: {
    type: String,
    enum: ["stripe", "paypal"],
    required: [true, "Please specify payment method (stripe or paypal)"],
  },
  paymentsCreditCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: false,
  },
  panier: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
