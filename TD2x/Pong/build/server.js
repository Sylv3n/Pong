"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const path_2 = __importDefault(require("path"));
var express = require('express');
const app = express_1.default();
let http = require('http').Server(app);
let io = require('socket.io')(http);


// ------------------------
// ROUTE
// ------------------------


app.use("/js", express.static('../js'));
app.use("/sound", express.static('../sound'));
app.use("/css", express.static('../css'));
//app.use("/node_modules", express.static('../node_modules/socket.io/lib/socket.js'));

app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'pong.html'));
});




this.users = []; 

// ------------------------
// // -- Create the playground
// ------------------------

let game = {
	groundWidth : 700,
	groundHeight : 400,	
	groundColor: "#005612",	
	netWidth : 6,
	netColor : "#FFFFFF",

	/*groundLayer : null,  
    scoreLayer : null,
    playersBallLayer : null,

    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,

    wallSound : null,
    //playerSound = null,
    soundPoint : null,
    playerSoundOne : null,
	playerSoundTwo : null,*/
	
	initialization: false,
	shutdownAI : [],


	//  -- ball settings --
	ball : {
		width : 10,
		height : 10,
		color : "#FFA500",
		posX : 200,
		posY : 200,
		speed : 1,
		directionX : 1,
		directionY : 1,


		/*  move : function() {
				this.posX += this.directionX * this.speed;
				this.posY += this.directionY * this.speed;
       		},  */
		

			coordinates: function(){
				return [this.posX + this.directionX * this.speed, this.posY + this.directionY * this.speed]
			},


			move : function(coordinates) {
				this.posX = coordinates[0];
				this.posY = coordinates[1];	  
			},


		/*
        displayBall : function() {
            game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
		},*/
		
		bounce : function(soundToPlay, anotherSound) {
			if ( game.ball.posX > game.groundWidth || this.posX < 0 ) {
				this.directionX = -this.directionX;
				//soundToPlay.play();
			}
			
			if ( this.posY > game.groundHeight || this.posY < 0  ) {
				this.directionY = -this.directionY;
				//soundToPlay.play();
			}    
		},
			
			
		collide : function(anotherItem) {
			if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
				// Collision
				return true;
			} 

			return false;
		}

	},


	//  -- handles events when the ball hits one side of the field --
	moveBall: function(coordinates) {
		//this.wallSound = new Audio("../sound/wall.mp3");
        //this.playerSound = new Audio("./sound/player.ogg");
		//this.soundPoint = new Audio("../sound/point.mp3");
		
		if(coordinates[0] == this.ball.posX && coordinates[1] == this.ball.posY) {
			return;
		}

		this.ball.move(coordinates);
		this.ball.bounce(this.wallSound, this.soundPoint);
	
		if(this.ball.posX < 0) {
			this.teams[1].score += 1;
			this.ball.posX = 200;
			this.ball.posY = 200;
			return [this.teams[0].score, this.teams[1].score];
		}
		
		else if(this.ball.posX > this.groundWidth) {
			this.teams[0].score += 1;
			this.ball.posX = 400;
			this.ball.posY = 200;
			return [this.teams[0].score, this.teams[1].score];
		}

		return null;
	},


	//  -- handles events when the ball hits a racket --
	collideBallWithPlayersAndAction : function() { 
		//this.playerSoundOne = new Audio("../sound/playerOne.mp3");
        //this.playerSoundTwo = new Audio("../sound/playerTwo.mp3");
		if (this.ball.collide(game.teams[0].playerOne) || this.ball.collide(game.teams[0].playerTwo)) {
			game.ball.directionX = -game.ball.directionX;
			//this.playerSound.play();
          	//this.playerSoundOne.play();
		}
		
		if (this.ball.collide(game.teams[1].playerOne) || this.ball.collide(game.teams[1].playerTwo)) {
			game.ball.directionX = -game.ball.directionX;
			//this.playerSound.play();
    		//this.playerSoundTwo.play();
		}
		return game.ball.directionX;
	},	


	//  -- Composition of the teams --
	teams:	[		
			
		{ 
			id : 1,
			score: 0,
			playerOne : {
				width : 10,
				height : 60,
				color : "#B82010",
				posX : 5,
				posY : 70,	
				score: 0,
				goUp : false,
				goDown : false,
				originalPosition : "left",
				idPlayer: null

			},

			playerTwo : {
				width : 10,
				height : 60,
				color : "#B82010",
				posX : 5,
				posY : 270,
				score: 0,
				goUp : false,
				goDown : false,
				originalPosition : "left",
				idPlayer: null
			}
		},


		{
			id : 2,
			score: 0,
			playerOne : {
				width : 10,
				height : 60,
				color : "#191919",
				posX : 685,
				posY : 70,
				goUp : false,
				goDown : false,
				originalPosition : "right",
				idPlayer: null
			},

			playerTwo : {
				width : 10,
				height : 60,
				color : "#191919",
				posX : 685,
				posY : 270,
				goUp : false,
				goDown : false,
				originalPosition : "right",
				idPlayer: null
			}
		}

	],


	setID : function(id) {
		
		if(this.teams[0].playerOne.idPlayer == null) {
			this.teams[0].playerOne.idPlayer = id;
		}
		
		else if(this.teams[0].playerTwo.idPlayer == null) {
			this.teams[0].playerTwo.idPlayer = id;
		}
		
		else if(this.teams[1].playerOne.idPlayer == null) {
			this.teams[1].playerOne.idPlayer = id;
		}
		
		else if(this.teams[1].playerTwo.idPlayer == null) {
			this.teams[1].playerTwo.idPlayer = id;
		}
			
	},

			
};


let posPlayersAtStart = {
	teams : [
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
		}
	]
		
};
	
	
const room = "room";
setInterval(function(){
	let score = game.moveBall(game.ball.coordinates());

	if(score !== null) {
		// --- Message treatment :
		io.to(room).emit('score',score);
	}

	var direction = game.collideBallWithPlayersAndAction();

	io.to(room).emit('ball',[game.ball.posX,game.ball.posY,direction]);
		
	let message = {
		teams : [
			{
				player1 : {
					y : game.teams[0].playerOne.posY,
					idPlayer : game.teams[0].playerOne.idPlayer
				},

				player2 : {
					y : game.teams[0].playerTwo.posY,
					idPlayer : game.teams[0].playerTwo.idPlayer						
				}
			},

			{
				player1 : {
					y : game.teams[1].playerOne.posY,
					idPlayer : game.teams[1].playerOne.idPlayer
				},
				
				player2 : {
					y : game.teams[1].playerTwo.posY,
					idPlayer : game.teams[1].playerTwo.idPlayer
				}
			}
		]
	};
		
		io.to(room).emit('infoPlayers',message);
		
		// -- Conversation stuff

}, 5);
		



// ------------------------
// // -- Catch a connection
// ------------------------

io.on('connection', (socket) => {
    console.log('a player connected', socket);
    console.log("Joueur Connecté");
	
    // -- Build a room
    socket.join(room);	

	game.setID(socket.id);
	console.log(socket.id);
	io.to(room).emit('initialization',game);
	io.to(room).emit('score',[0,0]);
	io.to(room).emit('ball',[game.ball.posX,game.ball.posY]);

	
	io.to(room).emit('infoPlayers',posPlayersAtStart);
    // -- catch disconnect
    socket.on('disconnect', () => {
        console.log('player disconnected');
    });

	socket.on('movePlayers', (message) => {
		// --- Message treatment :
		game.teams[0].playerOne.posY  = message.teams[0].player1.y;
		game.teams[0].playerTwo.posY  = message.teams[0].player2.y;
		game.teams[1].playerOne.posY  = message.teams[1].player1.y;
		game.teams[1].playerTwo.posY  = message.teams[1].player2.y;
	
	});
	
	socket.on('shutdownIA', (message) => {
		game.shutdownAI.push(message);
		if(message[0] == 0) {
			game.teams[0].playerTwo.idPlayer = socket.id;
		}

		else if(message[0] == 1) {	
			game.teams[1].playerOne.idPlayer = socket.id;
		}

		else if(message[0] == 2) {
			game.teams[1].playerTwo.idPlayer = socket.id;
		}

		io.to(room).emit('shutdownIAReturn',[message,game]);
	});

    // -- First message
    io.to(room).emit('welcome', room);
});


http.listen(3010, () => {
    console.info('HTTP server started on port 3010');
});
