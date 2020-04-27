game.control = {
  
	controlSystem : null,
	mousePointer : null,
   
	onKeyDown : function(event) {
		game.control.controlSystem = "KEYBOARD";
		
		if (game.teams[0].playerOne.usable == true) {
			if ( event.keyCode == game.keycode.KEYA ) { 
				game.teams[0].playerOne.goDown = true;
			} else if ( event.keyCode == game.keycode.KEYAND ) { 
				game.teams[0].playerOne.goUp = true;
			}
		}

		if(game.teams[0].playerTwo.usable == true){
			if ( event.keyCode == game.keycode.KEYW ) {
				game.socket.emit('shutdownIA',[0, game.playerID, 0]);
				game.teams[0].playerTwo.goDown = true;
			} else if ( event.keyCode == game.keycode.KEYS ) { 
				game.socket.emit('shutdownIA',[0, game.playerID, 0]);
				game.teams[0].playerTwo.goUp = true;
			}
		}

		if(game.teams[1].playerOne.usable == true) {	
			if (event.keyCode == game.keycode.KEYL) { 
				game.socket.emit('shutdownIA',[1, game.playerID, 1]);
				game.teams[1].playerOne.goDown = true;
			}
			
			else if (event.keyCode == game.keycode.KEYP) { 
				game.socket.emit('shutdownIA',[1, game.playerID,1]);
				game.teams[1].playerOne.goUp = true;
			}
		}

		if(game.teams[1].playerTwo.usable == true) {		
			if (event.keyCode == game.keycode.KEYDOWN) {
				game.socket.emit('shutdownIA',[2, game.playerID, 1]);
				game.teams[1].playerTwo.goDown = true;
			} 
			
			else if ( event.keyCode == game.keycode.KEYUP) { 
				game.socket.emit('shutdownIA',[2, game.playerID, 1]);
				game.teams[1].playerTwo.goUp = true;
			}
		}
  	},


  	shutdownIA : function(id) {
		if(game.AiFile[id[0]] != undefined && game.AiFile[id[0]] != undefined && game.AiFile[id[0]].player !== null) {
			game.AiFile[id[0]].activated = false;

			if(game.AiFile[id[0]].player.id == 1) {			
				game.teams[id[2]].playerOne.playerID = id[1]
			}

			else if(game.AiFile[id[0]].player.id == 2) {
				game.teams[id[2]].playerTwo.playerID = id[1]
			}
		}
	}, 


  	onKeyUp : function(event) {
		if(game.teams[0].playerOne.usable == true){
			if ( event.keyCode == game.keycode.KEYA ) { 
				game.teams[0].playerOne.goDown = false;
			} else if ( event.keyCode == game.keycode.KEYAND ) { 
				game.teams[0].playerOne.goUp = false;
			}
		}

		if(game.teams[0].playerTwo.usable == true){
			if ( event.keyCode == game.keycode.KEYW ) {
				game.socket.emit('shutdownIA',[0, game.playerID, 0]);
				game.teams[0].playerTwo.goDown = false;
			} else if ( event.keyCode == game.keycode.KEYS ) { 
				game.socket.emit('shutdownIA',[0, game.playerID, 0]);
				game.teams[0].playerTwo.goUp = false;
			}
		}

		if(game.teams[1].playerOne.usable == true) {	
			if (event.keyCode == game.keycode.KEYL) { 
				game.socket.emit('shutdownIA',[1, game.playerID, 1]);
				game.teams[1].playerOne.goDown = false;
			}
			
			else if (event.keyCode == game.keycode.KEYP) { 
				game.socket.emit('shutdownIA',[1, game.playerID, 1]);
				game.teams[1].playerOne.goUp = false;
			}
		}

		if(game.teams[1].playerTwo.usable == true) {		
			if (event.keyCode == game.keycode.KEYDOWN) {
				game.socket.emit('shutdownIA',[2, game.playerID, 1]);
				game.teams[1].playerTwo.goDown = false;
			}
			
			else if ( event.keyCode == game.keycode.KEYUP ) { 
				game.socket.emit('shutdownIA',[2, game.playerID, 1]);
				game.teams[1].playerTwo.goUp = false;
			}
		}
	},


	// For this TD3, i didn't had the time to adapt the MouseController
   /*
	onMouseMove : function(event) {
		
		game.control.controlSystem = "MOUSE";
	
		if ( event ) {
		game.control.mousePointer = event.clientY;
		}
	
		if ( game.control.mousePointer > game.playerOne.posY ) {
		game.playerOne.goDown = true;
		game.playerOne.goUp = false;
		} else if ( game.control.mousePointer < game.playerOne.posY ) {
		game.playerOne.goDown = false;
		game.playerOne.goUp = true;
		} else {
		game.playerOne.goDown = false;
		game.playerOne.goUp = false;
		}
	} */
};