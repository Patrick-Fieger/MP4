var express = require('express')
  , app = express()
  , dbconfig = require('./config/database')
  , expressconfig = require('./config/express')(app)
  , routes = require('./app/routes')(app)
  , port = 3000

  var io = require('socket.io')();

  io.sockets.on('connection', function(socket) {
	console.log('socket connection established');
    socket.on('init', function(data){
    	console.log('init invoked');
    });
  });

  app.use(express.static(__dirname + '/public')); 
  app.listen(port, function() {console.log('Express server listening on port ' + port);});