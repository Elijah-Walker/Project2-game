Game.MainMenu = function(game){

};

var gameBackground;
var button;

Game.MainMenu.prototype = {
    create: function(game){
        gameBackground = game.add.sprite(game.world.centerX, game.world.centerY -192, "menuScreen");
        button = game.add.button(game.world.centerX, game.world.centerY, "startButton", function(){
            this.state.start("level1", true, false);

        button.anchor.x = 0.5;
        button.anchor.y = 0.5;    
        });
        
        mainMenuMusic = game.add.audio(game, "<name of background song>", 1, true)
        mainMenuMusic.play();
    },
    update: function(game){

    }
}