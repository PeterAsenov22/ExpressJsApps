const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/users/register', auth.isAnonymous, controllers.users.registerGet)
  app.post('/users/register', auth.isAnonymous, controllers.users.registerPost)
  app.get('/users/login', auth.isAnonymous, controllers.users.loginGet)
  app.post('/users/login', auth.isAnonymous, controllers.users.loginPost)

  app.get('/users/logout', auth.isAuthenticated, controllers.users.logout)
  app.get('/products/order/:productId', auth.isAuthenticated, controllers.orders.customizeView)
  app.post('/products/order/:productId', auth.isAuthenticated, controllers.orders.checkout)
  app.get('/orders/details/:orderId', auth.isAuthenticated, controllers.orders.detailsView)
  app.get('/orders/status', auth.isAuthenticated, controllers.orders.statusView)

  app.get('/admin/product/create', auth.isAdmin, controllers.product.createView)
  app.post('/admin/product/create', auth.isAdmin, controllers.product.create)
  app.get('/admin/product/edit/:productId', auth.isAdmin, controllers.product.editView)
  app.post('/admin/product/edit/:productId', auth.isAdmin, controllers.product.edit)
  app.get('/admin/product/delete/:productId', auth.isAdmin, controllers.product.delete)
  app.get('/admin/orders/status', auth.isAdmin, controllers.orders.statusViewAdmin)
  app.post('/admin/orders/status', auth.isAdmin, controllers.orders.changeStatus)

  app.all('*', controllers.error)
}
