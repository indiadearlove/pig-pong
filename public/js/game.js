var game = new Phaser.Game(1400, 900, Phaser.AUTO, 'game-mainpage', { preload: preload, create: create, update: update, render: render });

// Initializing game =======================================================================

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

}

function render() {

    game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

}

// Game methods ============================================================================

function createPlayer() {

  character = game.add.sprite(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'farmer');
  character.scale.setTo(0.15, 0.15);
  character.anchor.setTo(0.5, 0.5);
  game.physics.enable(character, Phaser.Physics.ARCADE);
  character.body.collideWorldBounds = true;
  character.body.bounce.set(0.3);

}

function createBall() {

  ball = group.create(game.world.randomX, game.world.randomY, 'flyer', 1);
  
  game.physics.enable(ball, Phaser.Physics.ARCADE);

  ball.scale.setTo(0.02, 0.02);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1.01);
  ball.body.velocity.setTo(200,200);
  ball.body.rotation += ball.body.velocity.x/1000;

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
