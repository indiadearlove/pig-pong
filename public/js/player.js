
var player = new Phaser.Game(1400, 900, Phaser.AUTO, 'farmer', { preload: preload, create: create, update: update });

function preload() {

    player.load.image('farmer', 'images/farmer.jpg');
    // player.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');

}

var character;
var cursors;

function create() {

  player.physics.startSystem(Phaser.Physics.P2JS);
  cursors = player.input.keyboard.createCursorKeys();
  character = player.add.sprite(player.world.centerX-30, player.world.centerY-30, 'farmer');
  character.scale.setTo(0.25, 0.25);
  character.anchor.setTo(0.5, 0.5);
  player.physics.p2.enable(character);
  // character.body.collideWorldBounds = true;
  // // character.play('fly');


}

function update() {

    if (cursors.left.isDown) { character.body.rotateLeft(100); }
    else if (cursors.right.isDown) { character.body.rotateRight(100); } 
    else { character.body.setZeroRotation(); }
    if (cursors.up.isDown) { character.body.thrust(400); }
    else if (cursors.down.isDown) { character.body.reverse(300); }
};