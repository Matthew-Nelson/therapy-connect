const
  express = require('express'),
  Exercise = require('../models/Exercise.js'),
  authorize = require('../config/serverAuth.js').authorize,
  exercisesRouter = new express.Router()

exercisesRouter.use(authorize)

exercisesRouter.route('/')
  .get((req, res) => {
    Exercise.find({}, (err, exercises) => {
      res.json(exercises)
    })
  })
  .post((req, res) => {
    const newExercise = new Exercise(req.body)
    newExercise.save((err, exercise) => {
      res.json({success: true, message: "Exercise created.", exercise})
    })
  })

exercisesRouter.route('/:id')
  .patch((req, res) => {
    Exercise.findById(req.params.id, (err, exercise) => {
      Object.assign(exercise, req.body)
      exercise.save((err, exercise) => {
        res.json({success: true, message: "exercise updated"})
      })
    })
  })
  .delete((req, res) => {
    Exercise.findByIdAndRemove(req.params.id, (err, exercise) => {
      res.json({success: true, message: "exercise deleted", exercise})
    })
  })

module.exports = exercisesRouter
