var canvas, canvasContext;
const FRAMES_PER_SECOND = 30;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function(){	
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width, canvas.height, 'black');
	colorText("LOADING...", canvas.width/2, canvas.height/2, 'white');

	loadImages();
}

function startGame(){
	setInterval(updateAll, 1000 / FRAMES_PER_SECOND);
	setupInput();
	loadLevel(level0);
}

function loadLevel(level){
	trackGrid = level.slice();

	blueCar.reset(carPic, "Blue Storm");
	greenCar.reset(car2Pic, "Green Machine");
}

function updateAll(){
	moveAll();
	drawAll();
}

function moveAll(){
	blueCar.move();
	greenCar.move();
}

function drawAll(){
	drawTracks();
	blueCar.draw();
	greenCar.draw();
}