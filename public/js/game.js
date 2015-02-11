var game = new Phaser.Game(1400, 900, Phaser.CANVAS, 'game-mainpage', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('farmer', 'image/farmer.png');
  game.load.image('flyer', 'image/zombiepig.jpg');

}

var character;
var ball;
var cursors;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

// CHARACTER
  character = game.add.sprite(game.world.centerX-30, game.world.centerY-30, 'farmer');
  character.scale.setTo(0.25, 0.25);
  character.anchor.setTo(0.5, 0.5);
  game.physics.enable(character, Phaser.Physics.ARCADE);
  character.body.collideWorldBounds = true;
  character.body.bounce.set(0.3);


// BALL
  newball(0, 0);
  newball(30, 400);



  cursors = game.input.keyboard.createCursorKeys();
}

function newball(x, y) {

  ball = game.add.sprite(x, y, 'flyer');
  ball.scale.setTo(0.02, 0.02);
  ball.anchor.setTo(0.5, 0.5);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1.1);
  ball.body.velocity.setTo(400,400);

}

function update() {

    game.physics.arcade.collide(character, ball, destroySprite);

    if (cursors.left.isDown) { character.body.velocity.x -= 8; }
    else if (cursors.right.isDown) { character.body.velocity.x += 8; } 
    if (cursors.up.isDown) { character.body.velocity.y -= 8; }
    else if (cursors.down.isDown) { character.body.velocity.y += 8; }
  
  ball.rotation += ball.body.velocity.x/10000;
}

function destroySprite() {
  character.kill();
}