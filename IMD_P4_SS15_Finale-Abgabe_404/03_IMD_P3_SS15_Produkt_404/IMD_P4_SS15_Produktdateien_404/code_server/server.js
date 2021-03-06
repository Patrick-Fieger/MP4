/**
 * Server Config
 */

var express = require('express')
  , app = express()
  , dbconfig = require('./config/database')
  , expressconfig = require('./config/express')(app)
  , routes = require('./app/routes')(app)
  , port = 3000

  app.use(express.static(__dirname + '/images')); 
  app.listen(port, function() {console.log('Express server listening on port ' + port);});