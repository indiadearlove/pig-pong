var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('flyer', 'image/zombiepig.jpg');
};

var image;

function create() {

  
  game.physics.startSystem(Phaser.Physics.ARCADE);

  image = game.add.sprite(0, 0, 'flyer');
  
  image.scale.setTo(0.08, 0.08);

  game.physics.enable(image, Phaser.Physics.ARCADE);

  image.body.velocity.setTo(200,200);
    
  image.body.collideWorldBounds = true;
    
  image.body.bounce.set(1);

};

function update () {
    
};

function render () {
    game.debug.spriteInfo(image,32,32);

};