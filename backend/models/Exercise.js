const
  mongoose = require('mongoose'),
  exerciseSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    videoUrl: String
  })

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise
