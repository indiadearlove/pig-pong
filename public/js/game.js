var Phaser;

var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game-mainpage', { preload: preload, create: create, update: update, render: render });

// Initializing game =======================================================================

function preload() {

  game.load.image('farmer', 'image/farmer.png');
  game.load.image('flyer', 'image/zombiepig.jpg');
  game.load.spritesheet('explosion', 'image/explosion.png', 64, 64, 23);
  game.load.audio('ex_sound', 'audio/explosion.mp3');

}

var group;
var character;
var ball;
var cursors;
var timer;
var playerScore;
var dead = false;
var ex_sound;
var highscore = 0;

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
  timer.start();

  explosion = game.add.group();

  for (var i = 0; i < 10; i++)
  {
      var explosionAnimation = explosion.create(0, 0, 'explosion', [0], false);
      explosionAnimation.anchor.setTo(0.5, 0.5);
      explosionAnimation.animations.add('explosion');
  }

}

function update() {

  game.physics.arcade.collide(character, group, destroySprite);
  game.physics.arcade.collide(group, group);

  var left = cursors.left.isDown;
  var right = cursors.right.isDown;
  var up = cursors.up.isDown;
  var down = cursors.down.isDown;
  var bodyVelocity = character.body.velocity;

  if (left) { bodyVelocity.x -= 8; }
  else if (right) { bodyVelocity.x += 8; } 
  if (up) { bodyVelocity.y -= 8; }
  else if (down) { bodyVelocity.y += 8; }

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

  ball.destroy();

  //explosion

  var explosionAnimation = explosion.getFirstExists(false);
  explosionAnimation.reset(character.x, character.y);
  explosionAnimation.play('explosion', 30, false, true);

  //highscore

  var score = timer;
  playerScore = ((score._now - score._started)/1000);
  getScore(playerScore);
  dead = true;

}

function getScore(playerScore) {

  console.log(playerScore)
  deathLol(playerScore)
  group.destroy()
  game.time.reset();
  create();

}
