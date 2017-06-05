const
  express = require('express'),
  Routine = require('../models/Routine.js'),
  authorize = require('../config/serverAuth.js').authorize,
  routinesRouter = new express.Router()

routinesRouter.use(authorize)

routinesRouter.route('/')
  .get((req, res) => {
    Routine.find({}).populate('exercises').exec((err, routines) => {
      res.json(routines)
    })
  })
  .post((req, res) => {
    const newRoutine = new Routine(req.body)
    newRoutine.user = req.decoded._id
    newRoutine.save((err, routine) => {
      res.json({success: true, message: "Routine created.", routine})
    })
  })

routinesRouter.route('/:id')
  //this is only going to be adding exercises to a routine
  .post((req, res) => {
    Routine.findById(req.params.id, (err, routine) => {
      routine.exercises.push(req.body.exerciseId)
      routine.save((err, routine) => {
        res.json({success: true, message: 'exercise added to routine'})
      })
    })
  })
  .patch((req, res) => {
    Routine.findById(req.params.id, (err, routine) => {
      Object.assign(routine, req.body)
      routine.save((err, routine) => {
        res.json({success: true, message: "routine updated"})
      })
    })
  })
  .delete((req, res) => {
    Routine.findByIdAndRemove(req.params.id, (err, routine) => {
      res.json({success: true, message: "Routine deleted", routine})
    })
  })

routinesRouter.route('/:routineId/exercises/:exerciseId')
  .delete((req, res) => {

  })


module.exports = routinesRouter
