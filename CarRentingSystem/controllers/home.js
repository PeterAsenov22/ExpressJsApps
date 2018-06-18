module.exports.index = (req, res) => {
  let successMessage = req.query.success

  res.render('home', {
    successMessage: successMessage
  })
}
