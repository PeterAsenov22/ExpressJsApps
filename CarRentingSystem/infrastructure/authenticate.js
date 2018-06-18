const passport = require('passport')

module.exports = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.render('user/login', {user, error: err})
    }

    req.logIn(user, (err) => {
      if (err) {
        res.render('user/login', {error: 'Authentication not working!'})
        return
      }

      next()
    })
  })(req, res, next)
}
