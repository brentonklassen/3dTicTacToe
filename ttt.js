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
var opponent;
var newGameLinks = '<a href="#" onclick="newGame(\'human\');return false;">New game against a friend</a> \
<br><a href="#" onclick="newGame(\'computer\');return false;">New game against the computer</a>';

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

	drawBoard();
	setStatus(newGameLinks);
}

function setStatus(message){

	statusElement.innerHTML = message;
}


function newGame(o){

	opponent = o;
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

	var mirriorCells = [];

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

	return mirriorCells;
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

function getWinningCells(){

	var winningCells;
	var xWin;
	var oWin;
	var tWin;

	['a','b','c'].forEach(function(board){

		// check for column wins
		for (var row = 1; row <= 3; row++){
			xWin = [];
			oWin = [];
			tWin = [];
			for (var col = 1; col <= 3; col++){
				if (cellBelongsTo([board,row,col],'X')){
					xWin.push([board,row,col]);
				}
				if (cellBelongsTo([board,row,col],'O')){
					oWin.push([board,row,col]);
				}
				if (cellBelongsTo([board,row,col],'T')){
					tWin.push([board,row,col]);
				}

			}
			if (xWin.length == 3) winningCells = xWin;
			if (oWin.length == 3) winningCells = oWin;
			if (tWin.length == 3) winningCells = tWin;
		}

		// check for row wins
		for (var col = 1; col <= 3; col++){
			xWin = [];
			oWin = [];
			tWin = [];
			for (var row = 1; row <= 3; row++){
				if (cellBelongsTo([board,row,col],'X')){
					xWin.push([board,row,col]);
				}
				if (cellBelongsTo([board,row,col],'O')){
					oWin.push([board,row,col]);
				}
				if (cellBelongsTo([board,row,col],'T')){
					tWin.push([board,row,col]);
				}

			}
			if (xWin.length == 3) winningCells = xWin;
			if (oWin.length == 3) winningCells = oWin;
			if (tWin.length == 3) winningCells = tWin;
		}

		// check for diagonal wins
		xWin = [];
		oWin = [];
		tWin = [];
		for (var i = 1; i <=3; i++){
			if (cellBelongsTo([board,i,i],'X')){
				xWin.push([board,i,i]);
			}
			if (cellBelongsTo([board,i,i],'O')){
				oWin.push([board,i,i]);
			}
			if (cellBelongsTo([board,i,i],'T')){
				tWin.push([board,i,i]);
			}
		}
		if (xWin.length == 3) winningCells = xWin;
		if (oWin.length == 3) winningCells = oWin;
		if (tWin.length == 3) winningCells = tWin;

		// check for other diagonal wins
		xWin = [];
		oWin = [];
		tWin = [];
		for (var i = 1; i <=3; i++){
			if (cellBelongsTo([board,i,4-i],'X')){
				xWin.push([board,i,4-i]);
			}
			if (cellBelongsTo([board,i,4-i],'O')){
				oWin.push([board,i,4-i]);
			}
			if (cellBelongsTo([board,i,4-i],'O')){
				tWin.push([board,i,4-i]);
			}
		}
		if (xWin.length == 3) winningCells = xWin;
		if (oWin.length == 3) winningCells = oWin;
		if (tWin.length == 3) winningCells = tWin;
	});
	
	return winningCells;
}

function gameOver(){

	if (xCells.length + oCells.length + tCells.length >= 27) {
		setStatus('Tie!<br>' + newGameLinks);
		gameState = 'over';
		return true;
	}

	winningCells = getWinningCells();
	if (winningCells){

		setStatus(player + ' won!<br>' + newGameLinks);

		drawBoard();
		winningCells.forEach(function(cell){
			highlightCell(cell);
		});
		drawMarkedCells();
		gameState = 'over';

		return true;
	}
	return false;
}

function makeBestMove(){

	changePlayer();
	setStatus('The computer is playing...')

	var cell = getBestCell();
	if (cellIsMarked(cell)){
		console.log('The computer is cheating to get an O win!');
	}
	markCell(cell);
	if (gameOver()) return;
	drawMarkedCells();

	var mirriorCell = getBestMirror(cell);
	if (mirriorCell) {
		if (!isMirriorCell(mirriorCell)){
			console.log('The computer is cheating to get a T win!');
		}
		markCell(mirriorCell);
		if (gameOver()) return;
		markOtherMirrior();
		if (gameOver()) return;
		drawMarkedCells();
	}

	changePlayer();

}

function getBestCell(){

	var winningCell = canWin(player);
	var winningOpponenetCell = canWin((player=='X'?'O':'X'));
	var winningTCell = canWin('T');
	var winningTMirriors = getMirriorCells(winningTCell[0],winningTCell[1],winningTCell[2]);

	if (winningCell){
		return winningCell;
	}

	else if (winningTCell && winningTMirriors[0] && !cellIsMarked(winningTMirriors[0])){
		return winningTMirriors[0];
	}

	else if (winningTCell && winningTMirriors[1] && !cellIsMarked(winningTMirriors[1])){
		return winningTMirriors[1];
	}

	else if (winningOpponenetCell) {
		return winningOpponenetCell;
	}

	else {

		// get random cell

		var boards = ['a','b','c'];
		var board = boards[Math.floor(Math.random()*3)];
		var row = Math.floor(Math.random()*3)+1;
		var col = Math.floor(Math.random()*3)+1;

		while (cellIsMarked([board,row,col])){
			board = boards[Math.floor(Math.random()*3)];
			row = Math.floor(Math.random()*3)+1;
			col = Math.floor(Math.random()*3)+1;
		}

		return [board,row,col];
	}
}

function getBestMirror(cell){

	mirriorCells = getMirriorCells(cell[0],cell[1],cell[2]);

	if (mirriorCells){

		var winningTCell = canWin('T');

		if (equal(winningTCell, mirriorCells[0]) && mirriorCells[1]){
			return mirriorCells[1];
		}
		else if (equal(winningTCell, mirriorCells[1])){
			return mirriorCells[0];
		}
		else {
			// get random mirrior cell
			return mirriorCells[Math.floor(Math.random()*mirriorCells.length)];
		}
	}
}

function equal(a,b){
	return a && b && a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
}

function canWin(player){
	var boards = ['a','b','c'];
	for (var i = 0; i < 3; i++){
		var board = boards[i];
		for (var row = 1; row <=3; row++){
			for (var col = 1; col <= 3; col++){
				if (!cellIsMarked([board,row,col])){
					if (player == 'X'){
						xCells.push([board,row,col]);
						if (getWinningCells()) {
							xCells.pop();
							return [board,row,col];
						}
						else {
							xCells.pop();
						}
					}
					if (player == 'O'){
						oCells.push([board,row,col]);
						if (getWinningCells()) {
							oCells.pop();
							return [board,row,col];
						}
						else {
							oCells.pop();
						}
					}
					if (player == 'T'){
						tCells.push([board,row,col]);
						if (getWinningCells()) {
							tCells.pop();
							return [board,row,col];
						}
						else {
							tCells.pop();
						}
					}
				}
			}
		}
	}
	return false;
}

function tttOnClick(e){

	var coords = getMousePos(e);
	var cell = getCell(coords);
	if (!gameState || !cell || cellIsMarked(cell)) return;

	if (gameState == 'pickAny'){

		markCell(cell);
		drawMarkedCells();
		if (gameOver()) return;
		mirriorCells = getMirriorCells(cell[0],cell[1],cell[2]);

		if (mirriorCells.length > 0){
			mirriorCells.forEach(function(cell){
				highlightCell(cell);
			});
			gameState = 'pickMirror';
			setStatus(player + " pick a mirrior cell.");
		}
		else {
			if (opponent == 'human'){
				changePlayer();
			}
			else {
				makeBestMove();
				if (gameOver()) return;
			}
			gameState = 'pickAny';
			setStatus(player+' pick any cell.');
		}
	}

	else if (gameState == 'pickMirror') {

		if (isMirriorCell(cell)){

			markCell(cell);
			if (gameOver()) return;
			markOtherMirrior();
			if (gameOver()) return;
			drawBoard();
			drawMarkedCells();

			if (opponent == 'human'){
				changePlayer();
			}
			else {
				makeBestMove();
				if (gameOver()) return;
			}
			gameState = 'pickAny';
			setStatus(player+' pick any cell.');
		}
	}
}
