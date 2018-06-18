const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (app) => {
  app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
  }))
  app.set('view engine', '.hbs')
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(session({secret: 'S3cr3t', saveUninitialized: false, resave: false}))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user
      if (req.user.roles.indexOf('Admin') >= 0) {
        res.locals.admin = true
      }
    }

    next()
  })
}
