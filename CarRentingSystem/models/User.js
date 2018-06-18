const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const propertyIsRequired = '{0} is required.'

let userSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: propertyIsRequired.replace('{0}', 'Username'),
    unique: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: propertyIsRequired.replace('{0}', 'Password')
  },
  salt: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  roles: [{ type: mongoose.Schema.Types.String }]
})

userSchema.path('username').validate(function (u) {
  return u.length >= 3
}, 'Username minimum length is 3.')

userSchema.path('password').validate(function (p) {
  return p.length >= 5
}, 'Password minimum length is 5.')

userSchema.method({
  authenticate: function (pwd) {
    return encryption.generateHashedPassword(this.salt, pwd) === this.password
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
