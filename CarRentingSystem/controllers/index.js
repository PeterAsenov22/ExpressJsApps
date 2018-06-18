const userController = require('./user')
const homeController = require('./home')
const carsController = require('./car')
const errorController = require('./error')

module.exports = {
  user: userController,
  home: homeController,
  cars: carsController,
  error: errorController
}
