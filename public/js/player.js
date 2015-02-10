
var player = new Phaser.Game(700, 500, Phaser.AUTO, 'farmer', { preload: preload, create: create, update: update });

function preload() {

    player.load.image('farmer', 'images/farmer.jpg');
    // player.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');

}

var character;
var cursors;

function create() {

  player.physics.startSystem(Phaser.Physics.P2JS);
  player.physics.p2.restitution = 0.8;

  character = player.add.sprite(player.world.centerX-30, player.world.centerY-30, 'farmer');
  character.scale.setTo(0.3, 0.3);
  character.anchor.setTo(0.5, 0.5);
  character.play('fly');
  // character.animations.add('run');
  // character.animations.play('run', 10, true);
  player.physics.p2.enable(character);
  // character.physicsBodyType = Phaser.Physics.ARCADE;
  character.body.collideWorldBounds = true;

  cursors = player.input.keyboard.createCursorKeys();

}

function update() {

    character.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
    character.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
    character.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
      character.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        character.body.moveDown(200);
    }

}

function render() {
  player.debug.spriteInfo(s, 20, 32);

}