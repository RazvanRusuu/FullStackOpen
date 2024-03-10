const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(404).json("Cast Error- in progress");
  }

  next(err);
};
