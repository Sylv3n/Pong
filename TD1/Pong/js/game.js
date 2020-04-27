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

    ball : {
        width : 10,
        height : 10,
        color : "#FFA500",
        posX : 200,
        posY : 200,
        speed : 1,
        directionX : 1,
        directionY : 1,

        move : function() {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
        },

        displayBall : function() {
            game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
        },

        bounce : function(soundToPlay, anotherSound) {
            if ( this.posX > game.groundWidth || this.posX < 0 ) {
                this.directionX = -this.directionX;
                anotherSound.play();
            }

            if ( this.posY > game.groundHeight || this.posY < 0  ) {
              this.directionY = -this.directionY;
              soundToPlay.play();
            } 
            
        },

        collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
            || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
              // Collision
              return true;
            } 
            return false;
        },

    },


    moveBall : function() { 
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
    },


    movePlayers : function() {
        if ( game.control.controlSystem == "KEYBOARD" ) {
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

        } else if ( game.control.controlSystem == "MOUSE" ) {
            // mouse control
            if (game.playerOne.goUp && game.playerOne.posY > game.control.mousePointer)
                game.playerOne.posY-=5;
            else if (game.playerOne.goDown && game.playerOne.posY < game.control.mousePointer) {
                if ((game.playerOne.posY+60) < this.groundHeight) {
                    game.playerOne.posY+=5;
                }
            }
        }
    },


    playerOne : {
        width : 10,
        height : 60,
        color : "#B82010",
        posX : 10,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "left",
        score : 0
    },
       

    playerTwo : {
        width : 10,
        height : 60,
        color : "#191919",
        posX : 675,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "right",
        score : 0
    },


    init : function() {
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#005612", 0, 0); 
       
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
       
        game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#FFFFFF", 10, 10);
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  
       
        game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FFFFFF", 100, 100);

        this.displayScore(this.playerOne.score, this.playerTwo.score);
        this.displayBall(200,200);
        this.displayPlayers();
        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
        this.initMouse(game.control.onMouseMove);

        this.wallSound = new Audio("./sound/wall.mp3");
        //this.playerSound = new Audio("./sound/player.ogg");
        this.playerSoundOne = new Audio("./sound/playerOne.mp3");
        this.playerSoundTwo = new Audio("./sound/playerTwo.mp3");
        this.soundPoint = new Audio("./sound/point.mp3");

        game.ai.setPlayerAndBall(this.playerTwo, this.ball);
    },


    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },


    initMouse : function(onMouseMoveFunction) {
        window.onmousemove = onMouseMoveFunction;
    },


    displayScore : function(scorePlayer1, scorePlayer2) {
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "70px Gabriola", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "70px Gabriola", "#FFFFFF", this.scorePosPlayer2, 55);
    },
   

    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },


    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
    },
    
    clearLayer : function(targetLayer) {
        targetLayer.clear();
    }


  };