var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype ={
    init: function(){
        // limit number of input devices

        this.input.maxPointers = 1;
        
        // keep game from pausing if game ends up out of focus with browser

        this.stage.disableVisabilityChange = true;
    },

    preload: function(){
        this.load.image("loadingBar", "./assets/images/loading-bar/png")
    },
    
    create: function(){
        game.state.start("preload", true, false);
    }
}