const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

const personRouter = require('./src/routes/personRoute')
const { errorHandler } = require('./src/controllers/errorHandler')
const Person = require('./src/models/Person')
const { PORT } = require('./utilis/config')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

if (process.env.NODE_ENV !== 'prod') {
  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :body'
    )
  )
  morgan.token('body', (req) => {
    return JSON.stringify(req.body)
  })
}

app.use('/api/persons', personRouter)
app.get('/api/info', async (_, res) => {
  const persons = await Person.find({})
  res.send(`<p>Phonebook has info for ${persons.length} people</p> 
            <p>${new Date().toString()}</p>`)
})

app.use(errorHandler)

const port = PORT || 3000
app.listen(port, () => {
  console.log('server listen to' + port)
})
