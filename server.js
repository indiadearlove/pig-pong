var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var port = 9999;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

//============== Socket Stuff Goes Here =================
var EurecaServer = require('eureca.io').EurecaServer;

//create an instance of EurecaServer
var eurecaServer = new EurecaServer();

//attach eureca.io to our http server
eurecaServer.attach(server);


//eureca.io provides events to detect clients connect/disconnect

//detect client connection
eurecaServer.onConnect(function (conn) {    
    console.log('New Client id=%s ', conn.id, conn.remoteAddress);
});

//detect client disconnection
eurecaServer.onDisconnect(function (conn) {    
    console.log('Client disconnected ', conn.id);
});
//=======================================================

app.get('/', function(request, response){
  response.render('index');
});

app.post('/', function(req, res) {
  res.render('game', {username: req.body.username});
});

app.get('/game', function(request, response){
  response.render('game');
  console.log(request.body.username);
});

//============== Socket Stuff Goes Here =================

//=======================================================

server.listen(port, function(){
  console.log('Server running at ' + port);
});


module.exports = server;