const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(404).json("Cast Error- in progress");
  }

  if (err.name === "ValidationError") {
    return res.status(404).json("ValidationError- in progress");
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    const [pattern] = Object.keys(err.keyValue);
    return res.status(400).json({ error: `Expected ${pattern} to be unique ` });
  }

  if (err.name === "JsonWebTokenError" && err.name === "TokenExpiredError") {
    return res.status(401).json({ error: `Invalid or expired token` });
  }

  next(err);
};
module.exports = errorHandler;
