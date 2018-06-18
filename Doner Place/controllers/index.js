const home = require('./home-controller')
const users = require('./users-controller')
const product = require('./product-controller')
const orders = require('./order-controller')
const error = require('./error-controller')

module.exports = {
  home: home,
  users: users,
  product: product,
  orders: orders,
  error: error
}
