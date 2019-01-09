var mouseX = 0; 
var mouseY = 0;

const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

function keySet(keyEvent, car, setTo){
	if(keyEvent.keyCode === car.controlKeyLeft){
		car.keyHeld_TurnLeft = setTo;
	}

	if(keyEvent.keyCode === car.controlKeyRight){
		car.keyHeld_TurnRight = setTo;
	}

	if(keyEvent.keyCode === car.controlKeyUp){
		car.keyHeld_Gas = setTo;
	}

	if(keyEvent.keyCode === car.controlKeyDown){
		car.keyHeld_Reverse = setTo;
	}
	keyEvent.preventDefault();
}

function keyPressed(evt){
	keySet(evt, blueCar, true);
	keySet(evt, greenCar, true);
}

function keyReleased(evt){
	keySet(evt, blueCar, false);
	keySet(evt, greenCar, false);
}

function updateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

function setupInput(){
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueCar.setControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
	greenCar.setControls(KEY_W, KEY_D, KEY_S, KEY_A);
}