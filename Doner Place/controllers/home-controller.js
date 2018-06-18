const Doner = require('../models/Doner')

module.exports = {
  index: (req, res) => {
    let successMessage = req.query.success
    let errorMessage = req.query.error
    Doner
      .find()
      .then(doners => {
        let chickenProducts = doners.filter(d => d.category === 'chicken')
        let beefProducts = doners.filter(d => d.category === 'beef')
        let lambProducts = doners.filter(d => d.category === 'lamb')

        res.render('home/index', {
          chickenProducts,
          beefProducts,
          lambProducts,
          successMessage,
          errorMessage
        })
      })
  }
}
