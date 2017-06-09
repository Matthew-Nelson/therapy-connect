const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  usersRoutes = require('./routes/users.js'),
  routinesRoutes = require('./routes/routines.js'),
  exercisesRoutes = require('./routes/exercises.js'),
  cors = require('cors'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/project4',
  port = process.env.PORT || 3001

mongoose.connect(mongoUrl, (err) => {
  console.log(err || 'Connceted to mongoDB.')
})

app.use(logger('dev'))

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.json({message: "Server root. All API routes start with /api..."})
})

app.use('/api/users', usersRoutes)
app.use('/api/routines', routinesRoutes)
app.use('/api/exercises', exercisesRoutes)

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})
