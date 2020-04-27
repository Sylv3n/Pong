game.control = {
   
    onKeyDown : function(event) {
      if ( event.keyCode == game.keycode.KEYDOWN ) {
            game.playerOne.goDown = true;
        } else if ( event.keyCode == game.keycode.KEYUP ) {
            game.playerOne.goUp = true;
        }else if ( event.keyCode == game.keycode.KEYB ) {
            game.playerTwo.goDown = true;
        } else if ( event.keyCode == game.keycode.KEYA ) {
            game.playerTwo.goUp = true;
        }
    },
     
    onKeyUp : function(event) {
      if ( event.keyCode == game.keycode.KEYDOWN ) {
        game.playerOne.goDown = false;
      } else if ( event.keyCode == game.keycode.KEYUP ) {
        game.playerOne.goUp = false;
      }else if ( event.keyCode == game.keycode.KEYB ) {
            game.playerTwo.goDown = false;
        } else if ( event.keyCode == game.keycode.KEYA ) {
            game.playerTwo.goUp = false;
        }
    }
   
  }