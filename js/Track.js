const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20; // Canvas / TRACK_W
const TRACK_GAP = 2;
const TRACK_ROWS = 15;
var level0 = 	[3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,
				 3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
				 3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
				 1,0,0,0,1,1,1,3,3,3,3,1,1,1,1,1,1,0,0,1,
				 1,0,0,1,1,0,0,1,3,3,1,1,0,0,0,0,1,0,0,1,
				 1,0,0,1,0,0,0,0,1,3,1,0,0,0,0,0,1,0,0,1,
				 1,0,0,1,0,0,0,0,0,1,1,0,0,4,0,0,1,0,0,1,
				 1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,
				 1,0,0,1,0,0,4,0,0,0,4,0,0,1,0,0,1,0,0,1,
				 1,9,9,1,0,0,1,1,0,0,0,0,0,1,0,0,4,0,0,1,
				 1,1,1,1,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,
				 0,2,0,0,0,0,1,3,1,0,0,0,1,1,0,0,0,0,0,1,
				 0,2,0,0,0,0,1,3,3,1,1,1,1,1,1,0,0,0,0,1,
				 1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,3];

var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_GOAL = 2;
const TRACK_TREE = 3;
const TRACK_FLAG = 4;

const TRACK_PLAYERSTART = 9;

function returnTileTypeAtColRow(col, row){
	if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return trackGrid[trackIndexUnderCoord];
	}else{
		return TRACK_WALL;
	}
	
}

function trackCollision(car){
	var carTrackCol = Math.floor(car.x / TRACK_W);
	var carTrackRow = Math.floor(car.y / TRACK_H);
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

	if(carTrackCol >= 0 && carTrackCol < TRACK_COLS && 
		carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
		var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);

		if(tileHere === TRACK_GOAL){
			// GOAL CONDITION
			console.log(car.name,'has won the race!!!');
			loadLevel(level0);
		}else if(tileHere !== TRACK_ROAD){
			car.x -= Math.cos(car.ang) * car.speed;
			car.y -= Math.sin(car.ang) * car.speed;
			car.speed *= -0.5;
		}
	}
}

function rowColToArrayIndex(col,row){
	return col + TRACK_COLS * row;
}

function drawTracks(){
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	for(var row = 0; row < TRACK_ROWS; row += 1){
		for(var col = 0; col < TRACK_COLS; col += 1){

			var tileKindHere = trackGrid[arrayIndex];
			var useImg = trackPics[tileKindHere];
			canvasContext.drawImage(useImg, drawTileX, drawTileY);
			drawTileX += TRACK_W;
			arrayIndex++;
		}
		drawTileX = 0;
		drawTileY += TRACK_H;
	}
}