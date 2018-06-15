Game.Preloader = function(game){

    this.preloadBar = null;
};

Game.Preloader.prototype = {
     // the preload function is loading in all of our assets for the game, this won't need to occur in any other file for the game
    
     preload: function(){
      this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, "loadingBar");
      this.preloadBar.anchor.setTo(0.5, 0.5);
      
      // advanced profiling for the fps rate
      this.time.advancedTiming = true;

      // sets the loading bar as a preload sprite and makes the sprite automatically visible
      this.load.setPreloadSprite(this.preloadBar);
        
<<<<<<< HEAD
          // Load all of our images/spritesheets 
            // Sprite images for our playable character
            // At least 2-3 images for different types of platforms(think ice, regular, and spike)
            // a background image
            // spritesheet(s) for animations 
            this.load.image('menuScreen', './assets/images/UnicornTitleImage.png');
            this.load.image('startButton', './assets/images/Start-Button.png');
            this.load.image('asteroid', './assets/images/Asteroid.png');
            this.load.image('unicornParticle', './assets/images/Unicorn-Particle.png');
            this.load.spritesheet('<image name>', '<image address>', { frameWidth: 32, frameHeight: 48 });
            // Example of loading audio below
            this.load.audio("<audio name>", ["<mp3 audio file name>", "<ogg audio file name if applicable>"]);
=======
        // Load all of our images/spritesheets 
        // Sprite images for our playable character
        // At least 2-3 images for different types of platforms(think ice, regular, and spike)
        // a background image
        // spritesheet(s) for animations 
        this.load.image('menuScreen', './assets/images/UnicornTitleImage.png');
        this.load.image('startButton', './assets/images/Start-Button.png');
        this.load.image('<image name>', '<image address>');
        this.load.image('<image name>', '<image address>');
        this.load.spritesheet('<image name>', '<image address>', { frameWidth: 32, frameHeight: 48 });
        // Example of loading audio below
        this.load.audio("backgroundMusic", ["./assets/sounds/backgroundMusic.mp3"]);
        this.load.audio("titleMusic", ["./assets/sounds/titleMusic.mp3"]);
        this.load.audio("jumpSound", ["./assets/sounds/jumpSound.mp3"]);
        this.load.audio("deathSound", ["./assets/sounds/deathSound.mp3"]);
        this.load.audio("stepsSound", ["./assets/sounds/horseSteps.mp3"]);
        this.load.audio("<audio name>", ["<mp3 audio file name>", "<ogg audio file name if applicable>"]);
>>>>>>> 662fca243323c0419e229bbdf8e037397c494e60
    },

    create: function(){
      game.state.start("main", true, false);
    }
};