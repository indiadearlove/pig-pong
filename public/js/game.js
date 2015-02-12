var game = new Phaser.Game(1400, 900, Phaser.AUTO, 'game-mainpage', { preload: preload, create: create, update: update, render: render });

// Initializing game

function preload() {

  game.load.image('farmer', 'image/farmer.png');
  game.load.image('flyer', 'image/zombiepig.jpg');

}

var character;
var ball;
var cursors;
var timer;
var playerScore;
var dead = false;

function create() {

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

}

function update() {

    game.physics.arcade.collide(character, group, destroySprite);
    game.physics.arcade.collide(group, group);

    if (cursors.left.isDown) { character.body.velocity.x -= 8; }
    else if (cursors.right.isDown) { character.body.velocity.x += 8; } 
    if (cursors.up.isDown) { character.body.velocity.y -= 8; }
    else if (cursors.down.isDown) { character.body.velocity.y += 8; }

<<<<<<< HEAD
    

=======
>>>>>>> 9f560ac98609b1a52cd21fc3bd334c845c8b8f49
}

function render() {

  game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

}

// Game methods

function createPlayer() {

  character = game.add.sprite(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'farmer');
  character.scale.setTo(0.15, 0.15);
  character.anchor.setTo(0.5, 0.5);
  game.physics.enable(character, Phaser.Physics.ARCADE);
  character.body.collideWorldBounds = true;
  character.body.bounce.set(0.3);  
// ball.rotation += ball.body.velocity.x/1000;
}

function createBall() {

  ball = group.create(game.world.randomX, game.world.randomY, 'flyer', 1);
  
<<<<<<< HEAD
  //change i for number of balls

  for (var i = 0; i < 3; i++)
  {

    this.x = game.world.randomX + game.rnd.integerInRange(100,250);
    this.y = game.world.randomX + game.rnd.integerInRange(100,250);
    var ball = balls.create(this.x, this.y, 'flyer');
    ball.scale.setTo(0.02, 0.02);
    ball.anchor.setTo(0.5, 0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
=======
  game.physics.enable(ball, Phaser.Physics.ARCADE);
>>>>>>> 9f560ac98609b1a52cd21fc3bd334c845c8b8f49

  ball.scale.setTo(0.02, 0.02);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1.01);
  ball.body.velocity.setTo(200,200);
  ball.body.rotation += ball.body.velocity.x/1000;

<<<<<<< HEAD
  balls.setAll('body.rotation', 1)
  balls.setAll('body.collideWorldBounds', true);
  balls.setAll('body.bounce.x', 1);
  balls.setAll('body.bounce.y', 1);
  balls.setAll('body.velocity.x', 400);
  balls.setAll('body.velocity.y', 400)

  cursors = game.input.keyboard.createCursorKeys();
=======
>>>>>>> 9f560ac98609b1a52cd21fc3bd334c845c8b8f49
}

function destroySprite() {

  character.kill();

  var score = timer;
  playerScore = ((score._now - score._started)/1000);
  getScore(playerScore);

}

 function getScore(playerScore) {
   console.log(playerScore)
   deathLol(playerScore)
  }
