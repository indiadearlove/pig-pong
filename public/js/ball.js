var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('flyer', 'http://img1.wikia.nocookie.net/__cb20121103175717/angrybirds/images/archive/6/62/20121103180636!Zombie_Pig.png');
};

var image;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  image = game.add.sprite(0, 0, 'flyer');

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