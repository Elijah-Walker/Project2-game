MainMenu = function(game){

};

var gameBackground;
var button;

MainMenu.prototype = {
    create: function(game){
        gameBackground = game.add.sprite(game.world.centerX, game.world.centerY -192, "menuScreen");
        this.createButton(game, "startButton", 200, 200, function(){
            this.state.start("level1", true, false);
        });
        button = game.add.button(game.world.width*0.5, game.world.height*0.5, startGame, )
    },
    update: function(game){

    }
}