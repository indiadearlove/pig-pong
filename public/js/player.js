
var player = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function load() {

    player.load.image('mushroom', 'assets/sprites/mushroom2.png');

}

function create() {

    //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
    var test = player.add.sprite(200, 200, 'mushroom');

}