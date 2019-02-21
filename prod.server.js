var express = require('express')
var compression = require('compression')
var config = require('./config/index')
const data = require('./data.json')
const bodyParser = require('body-parser')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/data', function (req, res) {
  res.json({
    errno: 0,
    data: data
  })
})

app.use('/api', apiRoutes)

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
