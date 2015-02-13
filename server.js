var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 9999;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var clients = {};
//============== Socket Stuff Goes Here =================
var EurecaServer = require('eureca.io').EurecaServer;

//create an instance of EurecaServer
var eurecaServer = new EurecaServer({allow:['setId', 'spawnFarmer', 'kill', 'updateState']});

//attach eureca.io to our http server
eurecaServer.attach(server);


//eureca.io provides events to detect clients connect/disconnect

//detect client connection
eurecaServer.onConnect(function (conn) {    
    console.log('New Client id=%s ', conn.id, conn.remoteAddress);

     var remote = eurecaServer.getClient(conn.id); 

    clients[conn.id] = {id:conn.id, remote:remote}

    remote.setId(conn.id);
});

//detect client disconnection
eurecaServer.onDisconnect(function (conn) {    
    console.log('Client disconnected ', conn.id);

var removeId = clients[conn.id].id;
  
  delete clients[conn.id];
  
  for (var c in clients)
  {
    var remote = clients[c].remote;
    
    //here we call kill() method defined in the client side
    remote.kill(conn.id);
  } 
});

//============== Socket Stuff Goes Here =================
eurecaServer.exports.handshake = function()
{
  for (var c in clients)
  {
    var remote = clients[c].remote;
    for (var cc in clients)
    {   
      //send latest known position
      var x = clients[cc].laststate ? clients[cc].laststate.x:  0;
      var y = clients[cc].laststate ? clients[cc].laststate.y:  0;

    
    }
  }
}

eurecaServer.exports.handleKeys = function (keys) {
  var conn = this.connection;
  var updatedClient = clients[conn.id];
  
  for (var c in clients)
  {
    var remote = clients[c].remote;
    remote.updateState(updatedClient.id, keys);
    
    //keep last known state so we can send it to new connected clients
    clients[c].laststate = keys;
  }
}
//=======================================================

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


server.listen(port, function(){
  console.log('Server running at ' + port);
});


module.exports = server;