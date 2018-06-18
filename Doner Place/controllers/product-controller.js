const Doner = require('../models/Doner')
const Order = require('../models/Order')
const errorHandler = require('../utilities/error-handler')
const availableToppings = [
  'pickle',
  'tomato',
  'onion',
  'lettuce',
  'hot sauce',
  'extra sauce'
]

module.exports.createView = (req, res) => {
  res.render('product/create')
}

module.exports.create = (req, res) => {
  let {category, imageUrl, size, toppings} = req.body
  let donerObj = {
    category,
    imageUrl,
    size
  }

  donerObj.toppings = toppings
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length !== 0)
    .filter(t => availableToppings.includes(t))

  Doner
    .create(donerObj)
    .then(() => {
      res.redirect('/?success=Doner created successfully.')
    })
    .catch((err) => {
      res.render('product/create', {
        error: errorHandler.handleMongooseError(err),
        category,
        imageUrl,
        size,
        toppings
      })
    })
}

module.exports.delete = (req, res) => {
  let productId = req.params.productId
  Doner
    .findByIdAndRemove(productId)
    .then(() => {
      Order
        .remove({product: productId}, function (err) {
          if (err) {
            return res.redirect('/?error=Something went wrong.')
          }

          res.redirect('/?success=Product deleted successfully.')
        })
    })
    .catch(() => {
      res.redirect('/?error=Something went wrong.')
    })
}

module.exports.editView = (req, res) => {
  let productId = req.params.productId
  Doner
    .findById(productId)
    .then(product => {
      res.render('product/edit', product)
    })
    .catch(() => {
      res.render('product/edit', {
        error: 'Product not found'
      })
    })
}

module.exports.edit = (req, res) => {
  let productId = req.params.productId
  let {category, imageUrl, size, toppings} = req.body

  let toppingsFiltered = toppings
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length !== 0)
    .filter(t => availableToppings.includes(t))

  Doner
    .findById(productId)
    .then(product => {
      if (!product) {
        return res.render('product/edit', {
          error: 'Product not found'
        })
      }
      product.category = category
      product.imageUrl = imageUrl
      product.size = size
      product.toppings = toppingsFiltered
      product
        .save()
        .then(() => {
          res.redirect('/?success=Product edited successfully.')
        })
        .catch((err) => {
          res.render('product/edit', {
            error: errorHandler.handleMongooseError(err),
            category,
            imageUrl,
            size,
            toppings
          })
        })
    })
    .catch(() => {
      res.render('product/edit', {
        error: 'Product not found'
      })
    })
}
