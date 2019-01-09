var carPic = document.createElement('img');
var car2Pic = document.createElement('img');

trackPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
	picsToLoad--;
	if(picsToLoad === 0){
		startGame();
	}
}

function beginLoadingImage(imgVar, fileName){
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImagesForTrackCode(trackCode, fileName){
	trackPics[trackCode] = document.createElement('img');
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages(){
	var dataSet = [
		{varName: carPic, source: "player1car.png"},
		{varName: car2Pic, source: "player2car.png"},
		{trackType: TRACK_ROAD, source: "track_road.png"},
		{trackType: TRACK_WALL, source: "track_wall.png"},
		{trackType: TRACK_GOAL, source: "track_goal.png"},
		{trackType: TRACK_TREE, source: "track_tree.png"},
		{trackType: TRACK_FLAG, source: "track_flag.png"}
	];

	picsToLoad = dataSet.length;

	for(var img of dataSet){
		if(img.hasOwnProperty('varName')){
			beginLoadingImage(img.varName, img.source);
		}else{
			loadImagesForTrackCode(img.trackType, img.source);
		}
		
	}
}