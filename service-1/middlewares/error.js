const AppError = require("../utils/appError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // check if don't find id
  if (err.name === "CastError") {
    const message = `id not found of ${err.value}`;
    error = new AppError(message, 404);
  }

  // check if element is required (look error message in the model)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors);
    error = new AppError(message, 400);
  }

  // check duplicate element
  if (err.code === 11000) {
    const message = "Duplicate field value";
    error = new AppError(message, 400);
  }

  res.status(500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
