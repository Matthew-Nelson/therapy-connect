const
  User = require('../models/User.js')
  serverAuth = require('../config/serverAuth.js')

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  assignTherapist
}

function index(req, res) {
  User.find({}, '-__v', (err, users) => {
    res.json(users)
  })
}

function show(req, res) {
  User.findById(req.params.id, (err, user) => {
    res.json(user)
  })
}

function create(req, res) {
  User.create(req.body, (err, user) => {
    //toobject strips out all of the mongo info and just gives us the info that we saved when creating the user
    const userData = user.toObject()
    //takes password infor out of this object we created
    delete userData.password
    //generating our valid token as if we had just logged in
    const token = serverAuth.createToken(userData)
    //info that we are sending back to the client side
    //put the token in there too
    res.json({success: true, message: "User account created.", user, token})
  })
}

function update(req, res) {
  User.findById(req.params.id, (err, user) => {
    if(err) return console.log(err)
    Object.assign(user, req.body)
    user.save((err) => {
      res.json({success: true, message: "User updated...", user: user})
    })
  })
}

function destroy(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if(err) return console.log(err)
    res.json({success: true, message: "User deleted..."})
  })
}

function assignTherapist(req, res) {
  User.findById(req.params.therapistId, (err, therapist) => {
    if(err) return console.log(err)
    therapist.clients.push(req.params.userId)
    therapist.save((err, therapist) => {
      res.json({success: true, message: "client added to therpist's list"})
    })

  })
}
