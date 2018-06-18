const express = require('express')
const port = 2345
const app = express()

require('./config/express')(app)
require('./config/routes')(app)
require('./config/passport')()

require('./config/dbConfig')
  .then(() => {
    app.listen(port, () => console.log('Server listening on port: ' + port))
  })
  .catch(err => {
    console.log('Could not connect to MongoDb\n', err)
  })
