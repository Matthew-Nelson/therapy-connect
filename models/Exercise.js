const
  mongoose = require('mongoose'),
  exerciseSchema = new mongoose.Schema({
    name: String,
    prescription: String
  })

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise
