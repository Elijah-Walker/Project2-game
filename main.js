// Game.MainMenu = function(game){

// };

// var gameBackground;
// var button;

// Game.MainMenu.prototype = {
//     create: function(game){
//         gameBackground = game.add.sprite(game.world.centerX, game.world.centerY -192, "menuScreen");
//         button = game.add.button(game.world.centerX, game.world.centerY, "startButton", function(){
//             this.state.start("level1", true, false);

//         button.anchor.x = 0.5;
//         button.anchor.y = 0.5;    
//         });
        
//         mainMenuMusic = game.add.audio(game, "<name of background song>", 1, true)
//         mainMenuMusic.play();
//     },
//     update: function(game){

//     }
// }

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background', 'assets/bg.jpg');
    game.load.image('platform', 'assets/Red-UFO.png', );
    game.load.image('ice-platform', 'assets/Gray-UFO.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('player', 'assets/UnicornFramesLarger.png', 64, 64);
 
}
var platforms;
var stars;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var score = 0
var scoreText;

function create() {

    this.game.renderer.renderSession.roundPixels = true;

    this.world.resize(800, 2000);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.fixedToCamera = true;
    game.physics.arcade.gravity.y = 300;

    player = game.add.sprite(0,1999, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;

    player.animations.add('right', [0, 1, 2, 3, 4, 5, 6], 7, true);
    player.animations.add('turn', [16], 20, true);
    player.animations.add('left', [8, 9, 10, 11, 12, 13, 14], 10, true); 

//Star physics

//    stars = game.add.sprite(game.world.randomX, game.world.randomY, 'star');
    stars = this.add.physicsGroup();
    game.physics.enable(stars, Phaser.Physics.ARCADE);
    
    var x = 0;
    var y = 0;

    for (var m = 0; m < 50; m++) {
        var star = stars.create(m * 50, game.rnd.integerInRange(800, 1999), 'star');
        if (Math.random())

        x += game.world.randomX;

        if (x >= 600)
        {
            x = 0;
        }

        y+= game.world.randomY;

    }
    star.body.collideWorldBounds = true;

    stars.setAll('body.allowGravity', false);


//Platform physics
    platforms = this.add.physicsGroup();

    var x = 0;
    var y = 64;

    for (var i = 0; i < 100; i++)
    {
        var type = i % 2 === 1 ? 'platform' : 'ice-platform';
        var platform = platforms.create(x, y, type);

        //  Set a random speed between 50 and 200
        platform.body.velocity.x = this.rnd.between(100, 200);

        //  Inverse it?
        if (Math.random() > 0.5)
        {
            platform.body.velocity.x *= -1;
        }

        x += 200;

        if (x >= 600)
        {
            x = 0;
        }

        y+= 104;
    }

    platforms.setAll('body.allowGravity', false);
    platforms.setAll('body.immovable', true);

    this.camera.follow(player);

    scoreText = game.add.text(0,0, '', { fontSize: '32px', fill: '#ffffff'});
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(0,0);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
 
function wrapPlatform (platform) {

    if (platform.body.velocity.x < 0 && platform.x <= -160)
    {
        platform.x = 800;
    }
    else if (platform.body.velocity.x > 0 && platform.x >= 800)
    {
        platform.x = -160;
    }

}

function setFriction (player, platform) {

    if (platform.key === 'ice-platform')
    {
        player.body.x -= platform.body.x - platform.body.prev.x;
    }

}

function collectStars (player, stars) {
    stars.kill();

    score += 10;
    scoreText.text = 'Score: ' + score;

}
function update() {

    // game.physics.arcade.collide(player, layer);
    bg.tilePosition.y = -(this.camera.y * 0.7);

    platforms.forEach(wrapPlatform, this);

    this.physics.arcade.collide(player, platforms, setFriction, null, this);

    //  Do this AFTER the collide check, or we won't have blocked/touching set
    var standing = player.body.blocked.down || player.body.touching.down;
    

    game.physics.arcade.overlap(player, stars, collectStars, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && standing && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -275;
        jumpTimer = game.time.now + -400;
    }

    if (score === 500) {
        alert('You win!');
        score = 0;
    }


}

function render () {

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
game.state.start('mainState', true)