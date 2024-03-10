exports.errorHandler = (err, req, res, next) => {
  let message = "Somthing went wrong";
  let status = 500;
  console.log(err);
  if (err.name === "CastError") {
    message = "Please provide a valid id";
    status = 400;
    res.status(status).json({ status: "fail", message: message });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
  next(err);
};
