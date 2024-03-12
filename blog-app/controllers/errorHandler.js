const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(404).json("Cast Error- in progress");
  }

  if (err.name === "ValidationError") {
    return res.status(404).json("ValidationError- in progress");
  }

  next(err);
};
module.exports = errorHandler;
