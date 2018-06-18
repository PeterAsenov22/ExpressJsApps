const Car = require('../models/Car')
const errorHandler = require('../utilities/error-handler')

module.exports.viewAddCar = (req, res) => {
  let successMessage = req.query.success
  res.render('cars/create', {
    successMessage: successMessage
  })
}

module.exports.addCar = (req, res) => {
  let formObj = req.body
  let car = {
    make: formObj.make,
    model: formObj.model,
    imageUrl: formObj.imageUrl,
    color: formObj.color,
    pricePerDay: formObj.pricePerDay
  }

  Car
    .create(car)
    .then(() => {
      res.redirect('/cars/add?success=Car created successfully.')
    })
    .catch((error) => {
      res.render('cars/create', {
        error: errorHandler.handleMongooseError(error),
        car
      })
    })
}

module.exports.viewAll = (req, res) => {
  let successMessage = req.query.success
  let queryData = req.query
  let page = parseInt(queryData.page) || 1
  let pageSize = 4

  Car
    .find({isRented: false})
    .sort('-rentedTimesCount')
    .skip((page - 1) * pageSize)
    .limit(pageSize + 1)
    .then(cars => {
      let hasNextPage = cars.length === 5
      if (hasNextPage) {
        cars.pop()
      }

      res.render('cars/all', {
        cars,
        hasPrevPage: page > 1,
        hasNextPage: hasNextPage,
        nextPage: page + 1,
        prevPage: page - 1,
        successMessage
      })
    })
}

module.exports.viewRent = (req, res) => {
  let carId = req.params.carId
  Car
    .findById(carId)
    .then(car => {
      res.render('cars/rent', {car})
    })
    .catch(() => {
      res.render('cars/rent', {error: 'Car not found'})
    })
}

module.exports.rent = (req, res) => {
  let carId = req.params.carId
  let days = parseInt(req.body.days)

  Car
    .findById(carId)
    .then(car => {
      car.isRented = true
      car.rentedTimesCount++
      car.rentDaysLeft = days
      car.rentedBy = req.user._id

      car
        .save()
        .then(() => {
          res.redirect('/users/profile/me?success=Car rented successfully.')
        })
        .catch(() => {
          res.render('cars/rent', {
            error: 'Something went wrong.'
          })
        })
    })
    .catch(() => {
      res.render('cars/rent', {
        error: 'Car not found'
      })
    })
}

module.exports.viewEdit = (req, res) => {
  let carId = req.params.carId
  Car
    .findById(carId)
    .then(car => {
      res.render('cars/edit', {car})
    })
    .catch(() => {
      res.render('cars/edit', {
        error: 'Car not found'
      })
    })
}

module.exports.edit = (req, res) => {
  let carId = req.params.carId
  let formObj = req.body

  Car
    .findById(carId)
    .then(car => {
      car.make = formObj.make
      car.model = formObj.model
      car.imageUrl = formObj.imageUrl
      car.color = formObj.color
      car.pricePerDay = formObj.pricePerDay

      car
        .save()
        .then(() => {
          res.redirect('/cars/all?success=Car edited successfully.')
        })
        .catch((error) => {
          res.render('cars/edit', {
            error: errorHandler.handleMongooseError(error),
            car
          })
        })
    })
    .catch(() => {
      res.render('cars/edit', {
        error: 'Car not found'
      })
    })
}
