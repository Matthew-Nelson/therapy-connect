const
  mongoose = require('mongoose'),
  routineSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    boutDuration: Number,
    //how to set up an array of times in a schema and have them activate at given times
    activationTimes: [{type: String}],
    // I want this to be an array of exercises that comprise one routine.
    exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}]
  })

const Routine = mongoose.model('Routine', routineSchema)
module.exports = Routine
