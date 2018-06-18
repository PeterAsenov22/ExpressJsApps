const mongoose = require('mongoose')

let donerSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.String,
    enum: {
      values: ['chicken', 'lamb', 'beef'],
      message: 'Category is invalid, valid values include [chicken, lamb, beef].'
    },
    required: 'Doner category is required.'
  },
  imageUrl: {type: mongoose.Schema.Types.String, required: 'Doner image url is required.'},
  size: {
    type: mongoose.Schema.Types.Number,
    min: [17, 'Doner size could not be less than 17 cm.'],
    max: [24, 'Doner size could not be more than 24 cm.'],
    required: 'Doner size is required.'
  },
  toppings: [{type: mongoose.Schema.Types.String}]
})

donerSchema.path('imageUrl').validate(function (i) {
  return i.length >= 12
}, 'Image Url minimum length is 12.')

donerSchema.virtual('type').get(function () {
  return capitalizeFirstLetter(this.category) + ' doner'
})

donerSchema.virtual('isBeef').get(function () {
  return this.category === 'beef'
})

donerSchema.virtual('isLamb').get(function () {
  return this.category === 'lamb'
})

donerSchema.virtual('isChicken').get(function () {
  return this.category === 'chicken'
})

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

let Doner = mongoose.model('Doner', donerSchema)

module.exports = Doner
