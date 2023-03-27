const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  numero: {
    type: String,
    match: [/^\d{16}$/, "Numéro doit être composé de 16 chiffres seulement"]
  },
  dateExpiration: {
    type: String,
    match: [
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
      "Date expiration doit être au format MM/YYYY ou MM/YY",
    ],
  },
  cryptogramme: {
    type: String,
    match: [/^\d{3}$/, "Cryptogramme doit être composé de 3 chiffres seulement"]
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
