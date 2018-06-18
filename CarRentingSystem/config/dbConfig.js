const mongoose = require('mongoose')
const User = require('../models/User')
const Car = require('../models/Car')
const encryption = require('../utilities/encryption')
const connectionString = 'mongodb://localhost:27017/CarRentingSystem'

const carsSeed = require('../infrastructure/initialData').cars

module.exports = new Promise((resolve, reject) => {
  mongoose.connect(connectionString)

  let database = mongoose.connection

  database.once('open', err => {
    if (err) {
      console.log(err)
      reject(err)
    }

    console.log('Connected to db!')
    seed()
    resolve()
  })

  database.on('error', err => {
    console.log(err)
    reject(err)
  })
})

function seed () {
  User.find({username: 'admin'}).then(users => {
    if (users.length === 0) {
      console.log('Seeding intial data...')
      let salt = encryption.generateSalt()
      let hashedPass = encryption.generateHashedPassword(salt, 'Admin123')

      User
        .create({
          username: 'admin',
          salt: salt,
          password: hashedPass,
          roles: ['Admin']
        })
        .then(() => {
          Car
            .create(carsSeed)
            .then(() => {
              console.log('Initial seed successful.')
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }
  })
}
