var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 9999;

app.get('/', function(request, response){
  response.send('hello world');
});

server.listen(port, function(){
  console.log('Matteo is a fat prick on port ' + port);
});

module.exports = server;