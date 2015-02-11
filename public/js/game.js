var game = new Phaser.Game(1400, 900, Phaser.CANVAS, 'game-mainpage', { preload: preload, create: create, update: update, render: render });

function preload() {

  game.load.image('farmer', 'image/farmer.png');
  game.load.image('flyer', 'image/zombiepig.jpg');

}

var character;
var ball;
var cursors;
var timer;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  createPlayer();
  
  


  createBall();

  cursors = game.input.keyboard.createCursorKeys();

  timer = game.time.create(false);
  // timer.add(3000, createPlayer, this);
  timer.start();

}

function update() {

    game.physics.arcade.collide(character, ball, destroySprite);

    if (cursors.left.isDown) { character.body.velocity.x -= 8; }
    else if (cursors.right.isDown) { character.body.velocity.x += 8; } 
    if (cursors.up.isDown) { character.body.velocity.y -= 8; }
    else if (cursors.down.isDown) { character.body.velocity.y += 8; }
    
    ball.rotation += ball.body.velocity.x/10000;


}

function render() {

    game.debug.text('Time: ' + game.time.totalElapsedSeconds(), 32, 32);
    game.debug.text("Time until event: " + timer.duration.toFixed(5), 10, 20);


}

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
  balls.enableBody = true;
  balls.physicsBodyType = Phaser.Physics.ARCADE;

  for (var i = 0; i < 5; i++)
  {
    this.x = game.world.randomX + game.rnd.integerInRange(100,250);
    this.y = game.world.randomX + game.rnd.integerInRange(100,250);
    ball = game.add.sprite(this.x, this.y, 'flyer');
    ball.scale.setTo(0.02, 0.02);
    ball.anchor.setTo(0.5, 0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1.1);
    ball.body.velocity.setTo(400,400);
    ball.body.rotation += ball.body.velocity.x/10000;
  }

  cursors = game.input.keyboard.createCursorKeys();
}

function destroySprite() {
  timer.pause(clearEvents);
  character.kill();

}