const mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, required: true},
  product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doner'},
  dateCreated: {type: mongoose.Schema.Types.Date, required: true, default: Date.now},
  status: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['Pending', 'In progress', 'In transit', 'Delivered'],
      message: 'Category is invalid, valid values include [chicken, lamb, beef].'
    },
    default: 'Pending',
    required: 'Order status is required.'
  },
  toppings: [{type: mongoose.Schema.Types.String}]
})

orderSchema.virtual('dateUTC').get(function () {
  return this.dateCreated.toUTCString()
})

orderSchema.virtual('pending').get(function () {
  return this.status === 'Pending'
})

orderSchema.virtual('inProgress').get(function () {
  return this.status === 'In progress'
})

orderSchema.virtual('inTransit').get(function () {
  return this.status === 'In transit'
})

orderSchema.virtual('delivered').get(function () {
  return this.status === 'Delivered'
})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order
