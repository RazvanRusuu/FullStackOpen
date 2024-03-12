require("dotenv").config();
const PORT = process.env.PORT || 3002;

const MONGO_URI =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_TEST;

module.exports = { PORT, MONGO_URI };
