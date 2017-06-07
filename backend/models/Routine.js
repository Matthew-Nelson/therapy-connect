const
  mongoose = require('mongoose'),
  routineSchema = new mongoose.Schema({
    name: String,
    body: String,
    //exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}],
    completeDate: String
    //completed: {type: Boolean, default: false}
  })

const Routine = mongoose.model('Routine', routineSchema)
module.exports = Routine, routineSchema
