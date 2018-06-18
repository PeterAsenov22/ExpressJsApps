const Doner = require('../models/Doner')
const Order = require('../models/Order')

module.exports.customizeView = (req, res) => {
  let productId = req.params.productId
  Doner
    .findById(productId)
    .then(product => {
      res.render('orders/customize', product)
    })
    .catch(() => {
      res.render('orders/customize', {
        error: 'Product not found :('
      })
    })
}

module.exports.checkout = (req, res) => {
  let productId = req.params.productId
  let selectedToppings = []
  let defaultToppings = req.body.defaultToppings
  if (defaultToppings) {
    let keys = Object.keys(req.body)
    selectedToppings = keys
      .filter(k => k !== 'defaultToppings')
      .filter(k => defaultToppings.includes(k))
  }

  let orderObj = {
    creator: req.user._id,
    product: productId,
    toppings: selectedToppings
  }

  Order
    .create(orderObj)
    .then((order) => {
      res.redirect(`/orders/details/${order.id}`)
    })
    .catch(() => {
      res.redirect('/?error=Something went wrong :( Try again.')
    })
}

module.exports.detailsView = (req, res) => {
  let orderId = req.params.orderId
  Order
    .findById(orderId)
    .populate('product')
    .then(order => {
      if (!order) {
        return res.render('orders/details', {
          error: 'Order not found.'
        })
      }
      res.render('orders/details', order)
    })
    .catch(() => {
      res.render('orders/details', {
        error: 'Order not found.'
      })
    })
}

module.exports.statusView = (req, res) => {
  Order
    .find({creator: req.user._id})
    .populate('product')
    .then(orders => {
      res.render('orders/status', {orders})
    })
}

module.exports.statusViewAdmin = (req, res) => {
  Order
    .find()
    .populate('product')
    .then(orders => {
      res.render('orders/statusAdmin', {orders})
    })
}

module.exports.changeStatus = (req, res) => {
  let ordersIds = Object.keys(req.body)

  Order
    .find({
      _id: { $in: ordersIds }
    })
    .then(orders => {
      for (const order of orders) {
        console.log(order.status)
        console.log(req.body[order.id])
        if (order.status !== req.body[order.id]) {
          order.status = req.body[order.id]
          order.save()
        }
      }

      res.redirect('/?success=Status changed.')
    })
}
