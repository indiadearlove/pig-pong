var game = new Phaser.Game(1400, 900, Phaser.AUTO, 'game-mainpage', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('farmer', 'images/farmer.jpg');
  game.load.image('flyer', 'image/zombiepig.jpg');

}

var character;
var cursors;
var ball;

function create() {

  game.physics.startSystem(Phaser.Physics.P2JS);

  game.physics.p2.setImpactEvents(true);

  var characterCollisionGroup = game.physics.p2.createCollisionGroup();
  var ballCollisionGroup = game.physics.p2.createCollisionGroup();
  game.physics.p2.updateBoundsCollisionGroup();

  cursors = game.input.keyboard.createCursorKeys();

  character = game.add.sprite(game.world.centerX-30, game.world.centerY-30, 'farmer');
  character.scale.setTo(0.25, 0.25);
  character.anchor.setTo(0.5, 0.5);
  game.physics.p2.enable(character, false);
  character.enableBody = true;
  character.physicsBodyType = Phaser.Physics.P2JS;
  character.body.setCollisionGroup(characterCollisionGroup);

  game.physics.startSystem(Phaser.Physics.ARCADE);

  ball = game.add.sprite(0, 0, 'flyer');
  ball.scale.setTo(0.02, 0.02);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.velocity.setTo(200,200);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.body.setCollisionGroup(ballCollisionGroup);
  ball.body.collides(characterCollisionGroup, hitBall, this);

}

function hitBall(body1, body2) {

    body2.sprite.alpha -= 0.1;

}

function update() {

    if (cursors.left.isDown) { character.body.rotateLeft(100); }
    else if (cursors.right.isDown) { character.body.rotateRight(100); } 
    else { character.body.setZeroRotation(); }
    if (cursors.up.isDown) { character.body.thrust(400); }
    else if (cursors.down.isDown) { character.body.reverse(300); }
};