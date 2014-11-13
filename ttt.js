// Brenton's tick tack toe game from Jordan's idea
// 11/11/2014
// Lots of ideas from http://diveintohtml5.info/canvas.html

var canvasElement;
var drawingContext;
var canvasWidth = 400;
var canvasHeight = 400;
var sin60 = Math.sin(60*Math.PI/180);
var cos60 = Math.cos(60*Math.PI/180);

function initGame(){
	canvasElement = document.createElement('canvas');
	canvasElement.id = 'ttt_canvas';
	document.body.appendChild(canvasElement);
	canvasElement.width = canvasWidth;
	canvasElement.height = canvasHeight;
	canvasElement.addEventListener('click', tttOnClick, false);
	drawingContext = canvasElement.getContext('2d');
	newGame();
}

function newGame(){
	drawBoard();
}

function drawBoard(){

	drawingContext.clearRect(0,0,canvasWidth,canvasHeight);

	drawingContext.beginPath();

	// vertical lines
	for (var i = -3; i <= 3; i++){
		var xval = 200-50*i*sin60;
		var yval = 200-Math.abs(50*i*cos60);
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval,yval+150);
	}

	// left horizonts
	for (var i = 0; i <= 3; i++){
		drawingContext.moveTo(200,200+50*i);
		drawingContext.lineTo(200-150*sin60,200-150*cos60+50*i);
	}

	// right horizonts
	for (var i = 0; i <= 3; i++){
		drawingContext.moveTo(200,200+50*i);
		drawingContext.lineTo(200+150*sin60,200-150*cos60+50*i);
	}

	// top left
	for (var i = 0; i <= 3; i++){
		var xval = 200-50*i*sin60;
		var yval = 200-50*i*cos60;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval+150*sin60,yval-150*cos60);
	}

	// top right
	for (var i = 0; i <= 3; i++){
		var xval = 200+50*i*sin60;
		var yval = 200-50*i*cos60;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval-150*sin60,yval-150*cos60);
	}

	// draw it!
	drawingContext.strokeStyle = '#ffff';
	drawingContext.stroke();
}

function highlightCell(board, row, col){

	drawingContext.beginPath();

	if (board == 'a'){
		var xval = 200 - col*50*sin60;
		var yval = 200 + row*50 - col*50*cos60;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval,yval+50);
		drawingContext.lineTo(xval-50*sin60,yval+50-50*cos60);
		drawingContext.lineTo(xval-50*sin60,yval-50*cos60);
	}

	if (board == 'b'){
		var xval = 200 - col*50*sin60 + row*50*sin60;
		var yval = 200 - col*50*cos60 - row*50*cos60;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval-50*sin60,yval-50*cos60);
		drawingContext.lineTo(xval,yval-100*cos60);
		drawingContext.lineTo(xval+50*sin60,yval-50*cos60);
	}

	if (board == 'c'){
		var xval = 200 + col*50*sin60;
		var yval = 200 + row*50 - col*50*cos60;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval,yval+50);
		drawingContext.lineTo(xval+50*sin60,yval+50-50*cos60);
		drawingContext.lineTo(xval+50*sin60,yval-50*cos60);
	}
	
	drawingContext.closePath();
	drawingContext.fillStyle = '#F5F59B';
	drawingContext.fill();

}

function getMousePos(e) {

	var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
    }
    else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvasElement.offsetLeft;
    y -= canvasElement.offsetTop;

    return [x,y];

}

function getCell(coords){
	x = coords[0];
	y = coords[1];

	console.log(coords);

	if (y < 200-Math.abs((200-x)*cos60)
		&& y > 200-300*cos60+Math.abs((200-x)*cos60)){
		console.log('you hit b');
	}
	else {
		console.log('you missed');
	}
}

function tttOnClick(e){

	var coords = getMousePos(e);
	getCell(coords);

}