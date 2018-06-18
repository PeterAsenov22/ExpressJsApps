const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

let userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is required.', unique: true },
  firstName: { type: String, required: 'First Name is required.' },
  lastName: { type: String, required: 'Last Name is required.' },
  salt: String,
  password: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let password = encryption.generateHashedPassword(salt, '123456')

    User.create({
      username: 'Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      salt: salt,
      password: password,
      roles: ['Admin']
    })
  })
}
