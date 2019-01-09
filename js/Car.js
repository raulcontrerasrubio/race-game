const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

const DEFAULT_ANG = -Math.PI/2;
const DEFAULT_SPEED = 0;

function carClass(){

	this.x = 75;
	this.y = 100;
	this.speed = DEFAULT_SPEED;
	this.ang = DEFAULT_ANG;
	this.image;
	this.name = "Untitled car";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setControls = function(upKey, rightKey, downKey, leftKey){
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(image, name){
		this.image = image;
		this.name = name;
		this.ang = DEFAULT_ANG;
		this.speed = DEFAULT_SPEED;

		for(var row = 0; row < TRACK_ROWS; row += 1){
			for(var col = 0; col < TRACK_COLS; col += 1){
				var arrayIndex = rowColToArrayIndex(col, row);
				if(trackGrid[arrayIndex] == TRACK_PLAYERSTART){
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.x = col * TRACK_W + TRACK_W/2;
					this.y = row * TRACK_H + TRACK_H/2;
					return;
				}
			}
		}
	}

	this.move = function(){
		this.speed *= GROUNDSPEED_DECAY_MULT;

		if(this.keyHeld_Gas){
			this.speed += DRIVE_POWER;
		}

		if(this.keyHeld_Reverse){
			this.speed -= REVERSE_POWER;
		}
		if(Math.abs(this.speed) > MIN_SPEED_TO_TURN){
			if(this.keyHeld_TurnLeft){
				this.ang -= TURN_RATE;
			}

			if(this.keyHeld_TurnRight){
				this.ang += TURN_RATE;
			}
		}
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

		trackCollision(this);
	}



	this.draw = function(){
		drawBitMapWithRotation(this.image ,this.x,this.y, this.ang);
	}
}