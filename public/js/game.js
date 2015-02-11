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
  
  createPlayer();
  createBall();

  cursors = game.input.keyboard.createCursorKeys();

  timer = game.time.create(true);
  timer.start()

}

function update() {

    game.physics.arcade.collide(character, balls, destroySprite);

    if (cursors.left.isDown) { character.body.velocity.x -= 8; }
    else if (cursors.right.isDown) { character.body.velocity.x += 8; } 
    if (cursors.up.isDown) { character.body.velocity.y -= 8; }
    else if (cursors.down.isDown) { character.body.velocity.y += 8; }

    // ball.rotation += ball.body.velocity.x/1000;

}

function render() {

    game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

}

// Game methods ============================================================================

function createPlayer() {

  character = game.add.sprite(game.world.centerX-30, game.world.centerY-30, 'farmer');
  character.scale.setTo(0.25, 0.25);
  character.anchor.setTo(0.5, 0.5);
  game.physics.enable(character, Phaser.Physics.ARCADE);
  character.body.collideWorldBounds = true;
  character.body.bounce.set(0.3);

}

function createBall() {

  balls = game.add.group();
  
  //change i for number of balls
  for (var i = 0; i < 3; i++)
  {

	  var ball = balls.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'flyer');
	  ball.scale.setTo(0.02, 0.02);
	  ball.anchor.setTo(0.5, 0.5);
	  game.physics.enable(ball, Phaser.Physics.ARCADE);

  }

  balls.setAll('body.collideWorldBounds', true);
  balls.setAll('body.bounce.x', 1);
  balls.setAll('body.bounce.y', 1);
  balls.setAll('body.velocity.x', 400);
  balls.setAll('body.velocity.y', 400)

  cursors = game.input.keyboard.createCursorKeys();
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


