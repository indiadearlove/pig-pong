var game = new Phaser.Game(1400, 900, Phaser.CANVAS, 'flyer', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('flyer', 'image/zombiepig.jpg');
};

var image;

function create() {

  
  game.physics.startSystem(Phaser.Physics.ARCADE);

  ball = game.add.sprite(0, 0, 'flyer');
  
  ball.scale.setTo(0.02, 0.02);

  game.physics.enable(ball, Phaser.Physics.ARCADE);

  ball.body.velocity.setTo(200,200);
    
  ball.body.collideWorldBounds = true;
    
  ball.body.bounce.set(1);

};

function update () {
    
};