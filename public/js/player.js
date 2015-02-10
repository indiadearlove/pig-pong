
var player = new Phaser.Game(800, 600, Phaser.AUTO, 'farmer', { preload: preload, create: create });

function preload() {

    player.load.image('farmer', 'images/farmer.jpg');

}

function create() {

    var character = player.add.sprite(player.world.centerX-30, player.world.centerY-30, 'farmer');
    character.scale.setTo(0.3, 0.3);
    // character.anchor.
}