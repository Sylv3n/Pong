class ai {
  
	//player : null,
	//ball : null,
	
	constructor(team, player, ball) {
		this.team = team;
		this.player = player;
		this.ball = ball;
		this.activated = true;
	}
   

	//Return ball information
	move() {
		if(this.activated === true) {	
			if ( this.ball.directionX == 1 ) {
				if (this.player.originalPosition == "right") {
					// follow
					return this.followBall();
				}

				if (this.player.originalPosition == "left") {
					// center
					return this.goCenter();
				}  

			} 
			
			else {
				if (this.player.originalPosition == "right") {
					// center
					return this.goCenter();
				}

				if ( this.player.originalPosition == "left" ) {
					// follow
					return this.followBall();
				}  
			}
		}
  	}
 
	
	//Ball tracking
  	followBall() {
		if (this.ball.posY < this.player.posY + this.player.height/2) {
			// la position de la balle est sur l'écran, au dessus de celle de la raquette
			this.player.posY--;
		} 
		
		else if (this.ball.posY > this.player.posY + this.player.height/2) {
			// la position de la balle est sur l'écran, en dessous de celle de la raquette
			this.player.posY++;
		}

		return this.player.posY;
  	}
 

	goCenter() {
		if (this.player.posY + this.player.height/2 > game.groundHeight / 2) {
			this.player.posY--;
		}
		
		else if (this.player.posY + this.player.height/2 < game.groundHeight / 2) {
			this.player.posY++;
		}
		
		return this.player.posY;
	}

}