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
  .get((req, res) => {
    Routine.findById(req.params.id, (err, routine) => {
      res.json(routine)
    })
  })
  .post((req, res) => {
    Routine.findById(req.params.id, (err, routine) => {
      //we will have to give it a button or something with the end and then push it like that
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
    Routine.findById(req.params.routineId, (err, routine) => {
      var index = routine.exercises.indexOf(req.params.exerciseId)
      routine.exercises.splice(index, 1)
      routine.save((err, routine) => {
        res.json({success: true, message: "exercise removed from routine", routine})
      })
    })
  })


module.exports = routinesRouter
