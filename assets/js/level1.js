


create: function(){
    // this is the code to allow a user to pause the game

    pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the pause button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        // be sure to add a menu or a picture in center of screen to gauge if user clicks outside of it
        // this image will need to be added to preloader.js file(be sure to erase this comment when that is done)

        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

 // And a label to illustrate whether the outside of menu(picture) was clicked
 choiceLabel = game.add.text(w/2, h-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
 choiceLabel.anchor.setTo(0.5, 0.5);
});

// Add a input listener that can help us return from being paused
game.input.onDown.add(unpause, self);

// And finally the method that handels the pause menu
function unpause(event){

 // Only act if paused
 if(game.paused){

     // Calculate the corners of the menu or picture
     var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
         y1 = h/2 - 180/2, y2 = h/2 + 180/2;

     // Check if the click was inside the menu or picture
     if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

         // Get menu local coordinates for the click
         var x = event.x - x1,
             y = event.y - y1;

         // Calculate the choice 
         var choice = Math.floor(x / 90) + 3*Math.floor(y / 90);

         // Display the choice
         choiceLabel.text = 'Click outside of menu to continue the game';
     }
     else{
         // Remove the menu and the label
         menu.destroy();
         choiceLabel.destroy();

         // Unpause the game
         game.paused = false;
     }
 }
};
};