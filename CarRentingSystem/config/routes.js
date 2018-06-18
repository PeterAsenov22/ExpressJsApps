const controllers = require('../controllers/index')
// const authenticate = require('../infrastructure/authenticate')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/cars/all', controllers.cars.viewAll)

  app.get('/users/register', auth.isAnonymous, controllers.user.registerGet)
  app.post('/users/register', auth.isAnonymous, controllers.user.registerPost)
  app.get('/users/login', auth.isAnonymous, controllers.user.loginGet)
  app.post('/users/login', auth.isAnonymous, controllers.user.loginPost)

  app.get('/users/logout', auth.isAuthenticated, controllers.user.logout)
  app.get('/users/profile/me', auth.isAuthenticated, controllers.user.profile)
  app.get('/cars/rent/:carId', auth.isAuthenticated, controllers.cars.viewRent)
  app.post('/cars/rent/:carId', auth.isAuthenticated, controllers.cars.rent)

  app.get('/cars/add', auth.isAdmin, controllers.cars.viewAddCar)
  app.post('/cars/add', auth.isAdmin, controllers.cars.addCar)
  app.get('/cars/edit/:carId', auth.isAdmin, controllers.cars.viewEdit)
  app.post('/cars/edit/:carId', auth.isAdmin, controllers.cars.edit)

  app.all('*', controllers.error)
}
