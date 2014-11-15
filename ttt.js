// Brenton's tick tack toe game from Jordan's idea
// 11/11/2014
// Lots of ideas from http://diveintohtml5.info/canvas.html

var canvasElement;
var drawingContext;
var canvasWidth = 400;
var canvasHeight = 400;
var sin30 = Math.sin(30*Math.PI/180);
var cos30 = Math.cos(30*Math.PI/180);
var tan30 = Math.tan(30*Math.PI/180);
var gameState;
var player;
var xCells;
var oCells;
var tCells;
var mirriorCells;
var statusElement;

function initGame(){

	canvasElement = document.createElement('canvas');
	canvasElement.id = 'ttt_canvas';
	document.body.appendChild(canvasElement);
	canvasElement.width = canvasWidth;
	canvasElement.height = canvasHeight;
	canvasElement.addEventListener('click', tttOnClick, false);
	drawingContext = canvasElement.getContext('2d');

	statusElement = document.createElement('h3');
	statusElement.id = 'ttt_status';
	document.body.appendChild(statusElement);

	newGame();
}

function setStatus(message){

	statusElement.innerHTML = message;
}


function newGame(){

	xCells = [];
	oCells = [];
	tCells = [];
	player = 'X';
	drawBoard();
	gameState = 'pickAny';
	setStatus(player + " pick any cell.");

}

function drawBoard(){

	drawingContext.clearRect(0,0,canvasWidth,canvasHeight);

	drawingContext.beginPath();

	// vertical lines
	for (var i = -3; i <= 3; i++){
		var xval = 200-50*i*cos30;
		var yval = 200-Math.abs(50*i*sin30);
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval,yval+150);
	}

	// left horizonts
	for (var i = 0; i <= 3; i++){
		drawingContext.moveTo(200,200+50*i);
		drawingContext.lineTo(200-150*cos30,200-150*sin30+50*i);
	}

	// right horizonts
	for (var i = 0; i <= 3; i++){
		drawingContext.moveTo(200,200+50*i);
		drawingContext.lineTo(200+150*cos30,200-150*sin30+50*i);
	}

	// top left
	for (var i = 0; i <= 3; i++){
		var xval = 200-50*i*cos30;
		var yval = 200-50*i*sin30;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval+150*cos30,yval-150*sin30);
	}

	// top right
	for (var i = 0; i <= 3; i++){
		var xval = 200+50*i*cos30;
		var yval = 200-50*i*sin30;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval-150*cos30,yval-150*sin30);
	}

	// draw it!
	drawingContext.strokeStyle = '#ffff';
	drawingContext.stroke();
}

function changePlayer(){

	if (player == 'X'){
		player = 'O';
	}
	else {
		player = 'X';
	}
}

function drawMarkedCells(){

	xCells.forEach(function(cell){
		displayMark(cell,'x');
	});

	oCells.forEach(function(cell){
		displayMark(cell,'o');
	});

	tCells.forEach(function(cell){
		displayMark(cell,'t');
	});
}

function highlightCell(cell){

	// make indexing 0-based
	board = cell[0];
	row = cell[1] - 1;
	col = cell[2] - 1;

	drawingContext.beginPath();

	if (board == 'a'){
		var xval = 200 - col*50*cos30;
		var yval = 200 + row*50 - col*50*sin30;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval,yval+50);
		drawingContext.lineTo(xval-50*cos30,yval+50-50*sin30);
		drawingContext.lineTo(xval-50*cos30,yval-50*sin30);
	}

	if (board == 'b'){
		var xval = 200 - col*50*cos30 + row*50*cos30;
		var yval = 200 - col*50*sin30 - row*50*sin30;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval-50*cos30,yval-50*sin30);
		drawingContext.lineTo(xval,yval-100*sin30);
		drawingContext.lineTo(xval+50*cos30,yval-50*sin30);
	}

	if (board == 'c'){
		var xval = 200 + col*50*cos30;
		var yval = 200 + row*50 - col*50*sin30;
		drawingContext.moveTo(xval,yval);
		drawingContext.lineTo(xval,yval+50);
		drawingContext.lineTo(xval+50*cos30,yval+50-50*sin30);
		drawingContext.lineTo(xval+50*cos30,yval-50*sin30);
	}
	
	drawingContext.closePath();
	drawingContext.fillStyle = '#F5F59B';
	drawingContext.fill();

}

function displayMark(cell,mark){

	board = cell[0];
	row = cell[1] - 1;
	col = cell[2] - 1;
	var xval;
	var yval;

	if (board == 'a'){
		xval = 200 - (col*50+25)*cos30;
		yval = 200 + 25*sin30 + row*50 - col*50*sin30;
	}

	if (board == 'b'){
		xval = 200 - col*50*cos30 + row*50*cos30;
		yval = 200 - 50*sin30 - col*50*sin30 - row*50*sin30;
	}

	if (board == 'c'){
		xval = 200 + (col*50+25)*cos30;
		yval = 200 + 25*sin30 + row*50 - col*50*sin30;
	}
	drawShape(xval,yval,mark);
}

function drawShape(xval,yval,mark){

	if (mark == 'x'){
		drawingContext.beginPath();
		drawingContext.moveTo(xval-10,yval-10);
		drawingContext.lineTo(xval+10,yval+10);
		drawingContext.moveTo(xval+10,yval-10);
		drawingContext.lineTo(xval-10,yval+10);
		drawingContext.stroke();
	}

	if (mark == 'o'){
		drawingContext.beginPath();
		drawingContext.arc(xval,yval,10,0,2*Math.PI,false);
		drawingContext.stroke();
	}

	if (mark == 't'){
		drawingContext.beginPath();
		drawingContext.moveTo(xval,yval-10);
		drawingContext.lineTo(xval-10,yval+10);
		drawingContext.lineTo(xval+10,yval+10);
		drawingContext.closePath();
		drawingContext.stroke();
	}
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

	var board = '';
	var row = -1;
	var col = -1;
	var x = coords[0]-200;
	var y = 200-coords[1];

	// face b
	if (y > Math.abs(x*tan30) && y < 150-Math.abs(x*tan30)){
		board = 'b';
		for (var i = 1; i < 4; i++){
			if (y < i*50-x*tan30 && row == -1){
				row = i;
			}
			if (y < i*50+x*tan30 && col == -1){
				col = i;
			}
		}
	}

	// face a
	else if (x < 0 && Math.abs(x) < 150*cos30 
		&& y > Math.abs(x*tan30)-150
		&& y < 150-Math.abs(x*tan30)) {
		board = 'a';
		for (var i = 1; i < 4; i++){
			if (Math.abs(x) < i*50*cos30 && col == -1){
				col = i;
			}
			if (y > Math.abs(x*tan30)-i*50 && row == -1){
				row = i;
			}
		}
	}

	// face c
	else if (x > 0 && x < 150*cos30
		&& y > x*tan30-150
		&& y < 150-x*tan30) {
		board = 'c';
		for (var i = 1; i < 4; i++){
			if (x < i*50*cos30 && col == -1){
				col = i;
			}
			if (y > x*tan30-i*50 && row == -1){
				row = i;
			}
		}
	}

	if (board) return [board,row,col];
	else return false;
}

function getMirriorCells(board,row,col){

	mirriorCells = [];

	if (board == 'a'){
		if (!cellIsMarked(['b',row,col])){
			mirriorCells.push(['b',row,col]);
		}
		if (!cellIsMarked(['c',row,col])){
			mirriorCells.push(['c',row,col]);
		}
	}
	if (board == 'b'){
		if (!cellIsMarked(['a',row,col])){
			mirriorCells.push(['a',row,col]);
		}
		if (!cellIsMarked(['c',col,row])){
			mirriorCells.push(['c',col,row]);
		}
	}
	if (board == 'c'){
		if (!cellIsMarked(['a',row,col])){
			mirriorCells.push(['a',row,col]);
		}
		if (!cellIsMarked(['b',col,row])){
			mirriorCells.push(['b',col,row]);
		}
	}
}

function isMirriorCell(cell){

	var found = false;

	mirriorCells.forEach(function(mirriorCell){

		if (mirriorCell[0]==cell[0]
			&& mirriorCell[1]==cell[1]
			&& mirriorCell[2]==cell[2]){
			found = true;
		}

	});

	return found;
}

function cellIsMarked(cell){

	var found = false;

	xCells.forEach(function(markedCell){

		if (markedCell[0]==cell[0]
			&& markedCell[1]==cell[1]
			&& markedCell[2]==cell[2]){
			found = true;
		}

	});

	oCells.forEach(function(markedCell){

		if (markedCell[0]==cell[0]
			&& markedCell[1]==cell[1]
			&& markedCell[2]==cell[2]){
			found = true;
		}

	});

	tCells.forEach(function(markedCell){

		if (markedCell[0]==cell[0]
			&& markedCell[1]==cell[1]
			&& markedCell[2]==cell[2]){
			found = true;
		}

	});

	return found;

}

function markCell(cell){

	if (player == 'X'){
		xCells.push(cell);
	}
	else {
		oCells.push(cell);
	}
}

function markOtherMirrior(){

	mirriorCells.forEach(function(cell){
		if (!cellIsMarked(cell)){
			tCells.push(cell);
		}
	})
}

function cellBelongsTo(cell,player){

	var board = cell[0];
	var row = cell[1];
	var col = cell[2];
	var found = false;

	if (player == 'X'){

		xCells.forEach(function(cell){
			if (cell[0] == board
				&& cell[1] == row
				&& cell[2] == col){
				found = true;
			}
		});
	}

	else if (player == 'O'){

		oCells.forEach(function(cell){
			if (cell[0] == board
				&& cell[1] == row
				&& cell[2] == col){
				found = true;
			}
		});
	}

	else {
		tCells.forEach(function(cell){
			if (cell[0] == board
				&& cell[1] == row
				&& cell[2] == col){
				found = true;
			}
		});
	}

	return found;
}

function getWinCandidates(){

	var winCandidates = [];
	var xWin;
	var oWin;

	['a','b','c'].forEach(function(board){

		// check for column wins
		for (var row = 1; row <= 3; row++){
			xWin = [];
			oWin = [];
			for (var col = 1; col <= 3; col++){
				if (cellBelongsTo([board,row,col],'X')
					|| cellBelongsTo([board,row,col],'T')){
					xWin.push([board,row,col]);
				}
				if (cellBelongsTo([board,row,col],'O')
					|| cellBelongsTo([board,row,col],'T')){
					oWin.push([board,row,col]);
				}
			}
			if (xWin.length == 3) winCandidates.push(xWin);
			if (oWin.length == 3) winCandidates.push(oWin);
		}

		// check for row wins
		for (var col = 1; col <= 3; col++){
			xWin = [];
			oWin = [];
			for (var row = 1; row <= 3; row++){
				if (cellBelongsTo([board,row,col],'X')
					|| cellBelongsTo([board,row,col],'T')){
					xWin.push([board,row,col]);
				}
				if (cellBelongsTo([board,row,col],'O')
					|| cellBelongsTo([board,row,col],'T')){
					oWin.push([board,row,col]);
				}
			}
			if (xWin.length == 3) winCandidates.push(xWin);
			if (oWin.length == 3) winCandidates.push(oWin);
		}

		// check for diagonal wins
		xWin = [];
		oWin = [];
		for (var i = 1; i <=3; i++){
			if (cellBelongsTo([board,i,i],'X')
				|| cellBelongsTo([board,i,i],'T')){
				xWin.push([board,i,i]);
			}
			if (cellBelongsTo([board,i,i],'O')
				|| cellBelongsTo([board,i,i],'T')){
				oWin.push([board,i,i]);
			}
		}
		if (xWin.length == 3) winCandidates.push(xWin);
		if (oWin.length == 3) winCandidates.push(oWin);

		// check for other diagonal wins
		xWin = [];
		oWin = [];
		for (var i = 1; i <=3; i++){
			if (cellBelongsTo([board,i,4-i],'X')
				|| cellBelongsTo([board,i,4-i],'T')){
				xWin.push([board,i,4-i]);
			}
			if (cellBelongsTo([board,i,4-i],'O')
				|| cellBelongsTo([board,i,4-i],'T')){
				oWin.push([board,i,4-i]);
			}
		}
		if (xWin.length == 3) winCandidates.push(xWin);
		if (oWin.length == 3) winCandidates.push(oWin);
	});
	return winCandidates;
}

function determineWinner(winCandidates){

	// player gets first chance to win
	for (var i = 0; i < winCandidates.length; i++){
		for (var j = 0; j < 3; j++){
			cell = winCandidates[i][j];
			if (cellBelongsTo(cell,player)){
				return [player,winCandidates[i]];
			}
		}
	}

	var otherPlayer;
	if (player == 'X') otherPlayer = 'O';
	else otherPlayer = 'X';

	for (var i = 0; i < winCandidates.length; i++){
		for (var j = 0; j < 3; j++){
			cell = winCandidates[i][j];
			if (cellBelongsTo(cell,otherPlayer)){
				return [otherPlayer,winCandidates[i]];
			}
		}
	}
}

function gameOver(){

	winCandidates = getWinCandidates();
	if (winCandidates){
		winner = determineWinner(winCandidates);
		if (winner){

			var newGameLink = '<a href="#" onclick="newGame();return false;">New game</a>';
			setStatus(winner[0] + ' won! ' + newGameLink);

			drawBoard();
			winner[1].forEach(function(cell){
				highlightCell(cell);
			});
			drawMarkedCells();
			gameState = 'over';

			return true;
		}
	}
	return false;
}

function tttOnClick(e){

	var coords = getMousePos(e);
	var cell = getCell(coords);
	if (!cell || cellIsMarked(cell)) return;

	if (gameState == 'pickAny'){

		markCell(cell);
		if (gameOver()) return;
		getMirriorCells(cell[0],cell[1],cell[2]);
		mirriorCells.forEach(function(cell){
			highlightCell(cell);
		});
		drawMarkedCells();
		gameState = 'pickMirror';
		setStatus(player + " pick a mirrior cell.");

	}

	else if (gameState == 'pickMirror') {

		if (isMirriorCell(cell)){

			markCell(cell);
			markOtherMirrior();
			if (gameOver()) return;
			drawBoard();
			drawMarkedCells();
			changePlayer();
			gameState = 'pickAny';
			setStatus(player+' pick any cell.');

		}
	}
}
