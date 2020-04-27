var game = {
	
	groundWidth : 700,
	groundHeight : 400,
	groundColor: "#005612",
	netWidth : 6,
	netColor: "#FFFFFF",

	groundLayer : null,  
	scoreLayer : null,
	playersBallLayer : null,

	scorePosPlayer1 : 300,
	scorePosPlayer2 : 365,

    wallSound : null,
    //playerSound : null,
    playerSoundOne : null,
    playerSoundTwo : null,
    soundPoint : null,

	socket: null,
	launched: false,
	playerID: null,


	ball : {
		width : 10,
		height : 10,
		color : "#FFA500",
		posX : 200,
		posY : 200,
		speed : 1,
		directionX : 1,
		directionY : 1,

		
		coordinates: function(){
			return [this.posX + this.directionX * this.speed, this.posY + this.directionY * this.speed]
		},


		move : function(coordinates) {
			this.posX = coordinates[0];
			this.posY = coordinates[1];
			this.directionX = coordinates[2];	
		},


		bounce : function(soundToPlay, anotherSound) {
			if ( this.posX > game.groundWidth || this.posX < 0 ) {
			this.directionX = -this.directionX;
			//soundToPlay.play();
			}

			if ( this.posY > game.groundHeight || this.posY < 0  ) {
			this.directionY = -this.directionY;
			//soundToPlay.play();
			}  

		},


		/*collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
            || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
              // Collision
              return true;
            } 
            return false;
		},*/
		
	},


	displayBall : function() {
		game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
	},
	  

	coordBall : function() { 
		return this.ball.coordinates();
	},


	AiFile : [],


	teams: [
				
		{
			id : 1,
			score: 0,
			playerOne : {
				id: 1,
				width : 10,
				height : 60,
				color : "#B82010",
				posX : 5,
				posY : 70,	
				score: 0,
				goUp : false,
				goDown : false,				
				originalPosition : "left",
				usable: true,
				playerID: null
			},	

			playerTwo : {
				id: 2,
				width : 10,
				height : 60,
				color : "#B82010",
				posX : 5,
				posY : 270,
				score: 0,
				goUp : false,
				goDown : false,
				originalPosition : "left",
				usable: true,
				playerID: null
			}
		},


		{	
			id : 2,
			score: 0,
			playerOne : {
				id: 1,
				width : 10,
				height : 60,
				color : "#191919",
				posX : 685,
				posY : 70,
				goUp : false,
				goDown : false,
				originalPosition : "right",
				usable: true,
				playerID: null
			},

			playerTwo : {
				id: 2,
				width : 10,
				height : 60,
				color : "#191919",
				posX : 685,
				posY : 270,
				goUp : false,
				goDown : false,
				originalPosition : "right",
				usable: true,
				playerID: null
			}
		}			
	],
 

	   /*moveBall : function() { 
        this.ball.move();
        this.ball.bounce(this.wallSound, this.soundPoint);

        if(this.ball.posX < 0){
            this.playerTwo.score += 1;
            this.ball.posX = 200;
            this.ball.posY = 200;
            this.scoreLayer.clear();
            this.displayScore(this.playerOne.score,this.playerTwo.score);

        }else if(this.ball.posX > this.groundWidth){
            this.playerOne.score += 1;
            this.ball.posX = 200;
            this.ball.posY = 200;
            this.scoreLayer.clear();
            this.displayScore(this.playerOne.score,this.playerTwo.score);  
        }

        this.displayBall();
    }, 


    collideBallWithPlayersAndAction : function() { 
        if ( this.ball.collide(game.playerOne) ) {
          game.ball.directionX = -game.ball.directionX;
          //this.playerSound.play();
          this.playerSoundOne.play();
        }
        if ( this.ball.collide(game.playerTwo) ) {
          game.ball.directionX = -game.ball.directionX;
          //this.playerSound.play();
          this.playerSoundTwo.play();
        }
	},*/
	

	movePlayers : function(playersCoords) {
		/* if ( game.control.controlSystem == "KEYBOARD" ) {
            // keyboard control
            if ( game.playerOne.goUp ) {

                if (game.playerOne.posY > 0) {
                    game.playerOne.posY-=5;
                }

            } else if ( game.playerOne.goDown ) {

                if ((game.playerOne.posY+60) < this.groundHeight) {
                    game.playerOne.posY+=5;
                }
                
            }

        } 
        
        
        else if ( game.control.controlSystem == "MOUSE" ) {
            // mouse control
            if (game.playerOne.goUp && game.playerOne.posY > game.control.mousePointer)
                game.playerOne.posY-=5;
            else if (game.playerOne.goDown && game.playerOne.posY < game.control.mousePointer) {
                if ((game.playerOne.posY+60) < this.groundHeight) {
                    game.playerOne.posY+=5;
                }
            }
		}*/
		
		game.teams[0].playerOne.posY = playersCoords.teams[0].player1.y;
		game.teams[0].playerTwo.posY = playersCoords.teams[0].player2.y;
		game.teams[1].playerOne.posY = playersCoords.teams[1].player1.y;
		game.teams[1].playerTwo.posY = playersCoords.teams[1].player2.y;
	},


	initialization : function(launch) {
		
		this.groundWidth = launch.groundWidth;
		this.groundHeight = launch.groundHeight;
		
		this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#005612", 0, 0); 
	
		game.display.drawRectangleInLayer(this.groundLayer, launch.netWidth, this.groundHeight, launch.netColor, this.groundWidth/2 - launch.netWidth/2, 0);
		this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
	
		game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#FFFFFF", 10, 10);
		this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
	
		game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FFFFFF", 100, 100);


		this.displayScore(this.teams[0].score, this.teams[0].score);
		this.displayBall(200,200);
		this.displayPlayers();
		this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
		//this.initMouse(game.control.onMouseMove);

        this.wallSound = new Audio("./sound/wall.mp3");
        //this.playerSound = new Audio("./sound/player.ogg");
        this.playerSoundOne = new Audio("./sound/playerOne.mp3");
        this.playerSoundTwo = new Audio("./sound/playerTwo.mp3");
        this.soundPoint = new Audio("./sound/point.mp3");
		
		//game.ai.setPlayerAndBall(this.playerTwo, this.ball);
		game.AiFile[0] = new ai(this.teams[0].id,this.teams[0].playerTwo, this.ball);
		game.AiFile[1] = new ai(this.teams[1].id,this.teams[1].playerOne, this.ball);
		game.AiFile[2] = new ai(this.teams[1].id,this.teams[1].playerTwo, this.ball);
		
		launch.shutdownAI.forEach(function(element){
			game.control.shutdownIA(element);
		});

		this.deactivatePlayers(launch)
		
		this.launched = true;
	},


	deactivatePlayers: function(launch) {

		if(this.teams[0].playerOne.idPlayer == null ) {
			this.teams[0].playerOne.playerID = launch.teams[0].playerOne.idPlayer;	
		}

		if(this.teams[0].playerTwo.playerID == null) {
			this.teams[0].playerTwo.playerID = launch.teams[0].playerTwo.idPlayer;
		}

		if(this.teams[1].playerOne.idPlayer == null) {
			this.teams[1].playerOne.playerID = launch.teams[1].playerOne.idPlayer;
		}

		if(this.teams[1].playerTwo.idPlayer == null) {
			this.teams[1].playerTwo.playerID = launch.teams[1].playerTwo.idPlayer;
		}
		
		if(this.teams[0].playerOne.playerID != game.playerID) {
			this.teams[0].playerOne.usable = false;
		}

		if(this.teams[0].playerTwo.playerID != null && this.teams[0].playerTwo.playerID != game.playerID) {
			this.teams[0].playerTwo.usable = false;
		}

		if(this.teams[1].playerOne.playerID != null && this.teams[1].playerOne.playerID != game.playerID) {
			this.teams[1].playerOne.usable = false;
		}

		if(this.teams[1].playerTwo.playerID != null && this.teams[1].playerTwo.playerID != game.playerID) {
			this.teams[1].playerTwo.usable = false;
		}
	},


	initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
		window.onkeydown = onKeyDownFunction;
		window.onkeyup = onKeyUpFunction;
	},

	/*
	initMouse : function(onMouseMoveFunction) {
        window.onmousemove = onMouseMoveFunction;
	},
	*/

	displayScore : function(scorePlayer1, scorePlayer2) {
		this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
		game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "70px Gabriola", "#FFFFFF", this.scorePosPlayer1, 55);
		game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "70px Gabriola", "#FFFFFF", this.scorePosPlayer2, 55);
	},


	scoreChange: function(data) {
		if(this.scoreLayer !== null) {
			this.scoreLayer.clear();
			this.displayScore(data[0],data[1]);
		}
	},

  
	displayPlayers : function() {
		/*game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
		game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);*/
		game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[0].playerOne.width, this.teams[0].playerOne.height, this.teams[0].playerOne.color, this.teams[0].playerOne.posX, this.teams[0].playerOne.posY);
		game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[0].playerTwo.width, this.teams[0].playerTwo.height, this.teams[0].playerTwo.color, this.teams[0].playerTwo.posX, this.teams[0].playerTwo.posY);
		game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[1].playerOne.width, this.teams[1].playerOne.height, this.teams[1].playerOne.color, this.teams[1].playerOne.posX, this.teams[1].playerOne.posY);
		game.display.drawRectangleInLayer(this.playersBallLayer, this.teams[1].playerTwo.width, this.teams[1].playerTwo.height, this.teams[1].playerTwo.color, this.teams[1].playerTwo.posX, this.teams[1].playerTwo.posY);
	},


	playersCoordinates : function() {
		var coordinates = {
			teams: [
				{
					player1 : {
						y : game.teams[0].playerOne.posY
					},
					player2 : {
						y : game.teams[0].playerTwo.posY
					}
				},
				{
					player1 : {
						y : game.teams[1].playerOne.posY
					},
					player2 : {
						y : game.teams[1].playerTwo.posY
					}
				},
			]
		};


		if (game.control.controlSystem == "KEYBOARD") {
		// keyboard control
			if ( game.teams[0].playerOne.goUp ) {
				if(coordinates.teams[0].player1.y > 0) {
					coordinates.teams[0].player1.y-=5;
				}		
			} 
		
			else if (game.teams[0].playerOne.goDown) {
				if((coordinates.teams[0].player1.y+50) < this.groundHeight){
					coordinates.teams[0].player1.y+=5;
				}
			}
		
			if (game.teams[0].playerTwo.goUp) {
				if(coordinates.teams[0].player2.y > 0) {
					coordinates.teams[0].player2.y-=5;
				}
			} 
		
			else if (game.teams[0].playerTwo.goDown) {
				if((coordinates.teams[0].player2.y+50) < this.groundHeight) {
					coordinates.teams[0].player2.y+=5;
				}
			}
		
		
			if (game.teams[1].playerOne.goUp) {
				if(coordinates.teams[1].player1.y > 0) {
					coordinates.teams[1].player1.y-=5;
				}
			}
			
			else if (game.teams[1].playerOne.goDown) {
				if((coordinates.teams[1].player1.y+50) < this.groundHeight) {
					coordinates.teams[1].player1.y+=5;
				}
			}
		
			if (game.teams[1].playerTwo.goUp) {
				if(coordinates.teams[1].player2.y > 0) {
					coordinates.teams[1].player2.y-=5;
				}
			}
			
			else if (game.teams[1].playerTwo.goDown) {
				if((coordinates.teams[1].player2.y+50) < this.groundHeight){
					coordinates.teams[1].player2.y+=5;
				}
			}
		}
		
		return coordinates;

	}, 


	clearLayer : function(targetLayer) {
		targetLayer.clear();
	},

};