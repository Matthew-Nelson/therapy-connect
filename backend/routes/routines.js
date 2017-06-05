const
  express = require('express'),
  Routine = require('../models/Routine.js'),
  authorize = require('../config/serverAuth.js').authorize,
  routinesRouter = new express.Router()

routinesRouter.use(authorize)

routinesRouter.route('/')
  .get((req, res) => {
    Routine.find({}, (err, routines) => {
      res.json(routines)
    })
  })
  .post((req, res) => {
    const newRoutine = new Routine(req.body)
    //newRoutine.user = req.decoded._id
    newRoutine.save((err, routine) => {
      res.json({success: true, message: "Routine created.", routine})
    })
  })

routinesRouter.route('/:id')
  .patch((req, res) => {
    Routine.findById(req.params.id, (err, routine) => {
      //how to patch a routine
    })
  })
  .delete((req, res) => {
    Routine.findByIdAndRemove(req.params.id, (err, routine) => {
      res.json({success: true, message: "Routine deleted", routine})
    })
  })


module.exports = routinesRouter
