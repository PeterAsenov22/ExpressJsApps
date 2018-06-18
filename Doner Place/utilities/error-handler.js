module.exports = {
  handleMongooseError: (err) => {
    let key = Object.keys(err.errors).pop()
    let message = err.errors[key].message
    return message
  }
}
