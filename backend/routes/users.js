const
  express = require('express'),
  usersRouter = new express.Router(),
  usersCtrl = require('../controllers/users.js'),
  User = require('../models/User.js'),
  serverAuth = require('../config/serverAuth.js')

usersRouter.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, '+password',(err, user) => {
    if(!user || !user.validPassword(req.body.password)) {
      return res.status(403).json({message: "invalid credentials"})
    }
    if(user && user.validPassword(req.body.password)) {
      const userData = user.toObject()
      delete userData.password
      const token = serverAuth.createToken(userData)
      res.json({token: token})
    }
  })
})

usersRouter.route('/')
  .get(usersCtrl.index)
  .post(usersCtrl.create)

usersRouter.use(serverAuth.authorize)

usersRouter.route('/:id')
  .get(usersCtrl.show)
  .patch(usersCtrl.update)
  .delete(usersCtrl.destroy)
  .post(usersCtrl.assignTherapist)

// usersRouter.route('/:userId/therapist/:therapistId')
//   .patch(usersCtrl.assignTherapist)

module.exports = usersRouter
