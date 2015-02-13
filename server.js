var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 9999))

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

server.listen(app.get('port'), function(){
  console.log('Server running at ' + app.get('port'));
});

module.exports = server;