var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 9999;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.render('index');
});

app.get('/ball', function(request, response) {
	response.render('ball');
});

app.get('/player', function(request, response) {
	response.render('player');
});

server.listen(port, function(){
  console.log('Matteo is a fat prick on port ' + port);
});

module.exports = server;