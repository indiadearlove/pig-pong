// var pigSprite;

// var game = new Phaser.Game(
// 	800, 600, Phaser.AUTO, 'opening scene',
// 	 { preload: preload, create: create, update: update }
// );

// function preload() {

//     game.load.image('logo', 'images/mud.png'); 
// }

// function create() {

// 	game.add.tileSprite(0, 0, 800, 600, 'mud');

//     pigSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    
//     pigSprite.anchor.setTo(0.5, 0.5);
//     pigSprite.alpha = 0;

//     game.add.tween(pigSprite).to( { alpha: 1 }, 500);

// }

// function update() {

// }