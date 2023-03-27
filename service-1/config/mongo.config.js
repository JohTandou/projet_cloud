const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.URL_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
