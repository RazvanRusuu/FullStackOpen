require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI.replace(
  '<pass>',
  process.env.MONGO_PASS
)

module.exports = { PORT, MONGO_URI }
