const mongoose = require('mongoose')

let carSchema = mongoose.Schema({
  make: {type: mongoose.Schema.Types.String, required: 'Make of the car is required'},
  model: {type: mongoose.Schema.Types.String, required: 'Model of the car is required'},
  imageUrl: {type: mongoose.Schema.Types.String, required: 'Image Url of the car is required'},
  color: {type: mongoose.Schema.Types.String},
  pricePerDay: {type: mongoose.Schema.Types.Number, min: [1, 'Price could not be less than 1 leva per day'], required: 'Price per day of the car is required'},
  isRented: {type: mongoose.Schema.Types.Boolean, required: true, default: false},
  rentDaysLeft: {type: mongoose.Schema.Types.Number, required: true, default: 0},
  rentedBy: {type: mongoose.Schema.Types.ObjectId},
  rentedTimesCount: {type: mongoose.Schema.Types.Number, required: true, default: 0}
})

carSchema.path('model').validate(function (m) {
  return m.length >= 2
}, 'Model minimum length is 2.')

carSchema.path('make').validate(function (m) {
  return m.length >= 3
}, 'Make minimum length is 3.')

carSchema.path('imageUrl').validate(function (i) {
  return i.length >= 12
}, 'Image Url minimum length is 12.')

let Car = mongoose.model('Car', carSchema)

module.exports = Car
