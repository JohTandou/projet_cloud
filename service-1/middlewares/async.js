// design pattern error : dry (don't repeat yourself), for stop the use of try catch in each async methods (in controllers)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
