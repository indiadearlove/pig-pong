var myId=0;

var character;
var ball;
var player;
var cursors;
var timer;
var farmersList;
var explosions;
var playerScore;
var dead = false;
var ex_sound;


var ready = false;
var eurecaServer;
//this function will handle client communication with the server
var eurecaClientSetup = function() {
  //create an instance of eureca.io client
  var eurecaClient = new Eureca.Client();
  
  eurecaClient.ready(function (proxy) {   
    eurecaServer = proxy;
  }); 


eurecaClient.exports.setId = function(id) 
  {
    //create() is moved here to make sure nothing is created before uniq id assignation
    myId = id;
    create();
    eurecaServer.handshake();
    ready = true;
  } 
  
  eurecaClient.exports.kill = function(id)
  { 
    if (farmersList[id]) {
      farmersList[id].kill();
      console.log('killing ', id, farmersList[id]);
    }
  } 
  
  eurecaClient.exports.spawnFarmer = function(i, x, y)
  {
    
    if (i == myId) return; //this is me
    
    console.log('SPAWN');
    var frm = new Farmer(i, game, player)
    farmersList[i] = frm;
  }

    eurecaClient.exports.updateState = function(id, state)
  {
    if (farmersList[id])  {
      farmersList[id].cursor = state;
      farmersList[id].player.x = state.x;
      farmersList[id].player.y = state.y;
      farmerssList[id].update();
    }
  }
}



Farmer = function (index, game, player) {
  console.log("Farmer")


  this.farmer = game.add.sprite(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'farmer');
  this.farmer.scale.setTo(0.08, 0.08);
  this.farmer.anchor.setTo(0.5, 0.5);
  game.physics.enable(this.farmer, Phaser.Physics.ARCADE);
  this.farmer.body.collideWorldBounds = true;
  this.farmer.body.bounce.set(0.3);


  this.farmer.id = index;
  game.physics.enable(this.farmer, Phaser.Physics.ARCADE);
  this.farmer.body.immovable = false;
  this.farmer.body.collideWorldBounds = true;
  this.farmer.body.bounce.setTo(0, 0);

};



// Initializing game =======================================================================
var game = new Phaser.Game(1000, 500, Phaser.AUTO, 'game-mainpage', { preload: preload, create: eurecaClientSetup, update: update, render: render });

function preload() {

  game.load.image('farmer', 'images/farmer.png');
  game.load.image('flyer', 'images/zombiepig.jpg');
  game.load.spritesheet('explosion', 'images/explosion.png', 64, 64, 23);
  game.load.audio('ex_sound', 'audio/explosion.mp3');

}


//============== Socket Stuff Goes Here =================



//=======================================================

function create() {
  console.log("create")

  farmersList = {};


game.physics.startSystem(Phaser.Physics.ARCADE);

  group = game.add.group();
  group.enableBody = true;  
  group.physicsBodyType = Phaser.Physics.ARCADE;
  game.time.events.loop(5000, createBall, this);

  createBall();
  createPlayer();

  cursors = game.input.keyboard.createCursorKeys();
  timer = game.time.create(true);
  timer.start()

  //Explosion

  explosion = game.add.group();

  for (var i = 0; i < 10; i++)
  {
      var explosionAnimation = explosion.create(0, 0, 'explosion', [0], false);
      explosionAnimation.anchor.setTo(0.5, 0.5);
      explosionAnimation.animations.add('explosion');
  }


  timer = game.time.create(true);
  timer.start()


 

}

function update() {
  // working
  console.log('update2')

  //do not update if client not ready
  if (!ready) return;

  game.physics.arcade.collide(character, group, destroySprite);
  game.physics.arcade.collide(group, group);
  // ball.rotation += ball.body.velocity.x/1000;

  if (cursors.left.isDown) { character.body.velocity.x -= 8; }
  else if (cursors.right.isDown) { character.body.velocity.x += 8; } 
  if (cursors.up.isDown) { character.body.velocity.y -= 8; }
  else if (cursors.down.isDown) { character.body.velocity.y += 8; }



}



function render() {

    game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

}

// Game methods ============================================================================

function createPlayer() {

  character = game.add.sprite(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'farmer');
  character.scale.setTo(0.08, 0.08);
  character.anchor.setTo(0.5, 0.5);
  game.physics.enable(character, Phaser.Physics.ARCADE);
  character.body.collideWorldBounds = true;
  character.body.bounce.set(0.3);

  return character

}

function audio() {

  ex_sound = game.add.audio('ex_sound');
  ex_sound.play();

}

function createBall() {

  ball = group.create(game.world.randomX, game.world.randomY, 'flyer', 1);
  
  game.physics.enable(ball, Phaser.Physics.ARCADE);

  ball.scale.setTo(0.01, 0.01);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1.01);
  ball.body.velocity.setTo(200,200);

}

function destroySprite() {

  character.kill();

  var score = timer;
  playerScore = ((score._now - score._started)/1000);
  getScore(playerScore);
  console.log(score);
  var explosionAnimation = explosion.getFirstExists(false);
  explosionAnimation.reset(character.x, character.y);
  explosionAnimation.play('explosion', 30, false, true);
  audio();

}


function getScore(playerScore) {

  console.log(playerScore)
  deathLol(playerScore)

}


