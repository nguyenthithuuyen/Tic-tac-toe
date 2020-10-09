const MAX_ROW = 25;
const MAX_COL = 25;
const PLAYER1 = 1;
const PLAYER2 = 2;
const VALUE_X = "X";
const VALUE_O = "O";
const EMPTY = "";

let board = document.getElementById("board");
let turn = PLAYER1;
let winArr = [];


function drawBoard() {
    let str = "";
    for (let i = 0; i < MAX_ROW; i++) {
        str += "<tr>";
        for (let j = 0; j < MAX_COL; j++) {
            str += `<td id="cell-${i}-${j}" onclick="clickCell(${i},${j})"></td>`;
        }
        str += "</tr>"
    }

    board.innerHTML = str;
}

function clickCell(x,y) {
    let cell = document.getElementById(`cell-${x}-${y}`);
    if (cell.innerHTML !== EMPTY) return;
    // if(cell.innerHTML === ""){
    if (turn === PLAYER1) {
        cell.innerHTML = VALUE_X;
        cell.classList.add("red");
        turn = PLAYER2;
    } else {
        cell.innerHTML = VALUE_O;
        cell.classList.add("blue");
        turn = PLAYER1;
    }

    // }
    console.log(getValueCell(0,0));
    checkVertical(x,y);
    checkHorizontal(x,y);
    checkCross1(x,y);
    checkCross2(x,y);
}

function getValueCell(x,y) {
    return document.getElementById(`cell-${x}-${y}`).innerHTML;
}

function getCell(x,y) {
    return document.getElementById(`cell-${x}-${y}`);
}

function checkVertical(x,y) {
    let score = 1;
    let i = 1;
    winArr = [getCell(x,y)];
    while (getValueCell(x,y) === getValueCell(x,y+i)){
        score+=1;
        winArr.push(getCell(x,y+i));
        i++;
    }
    let j = 1;
    while (getValueCell(x,y) === getValueCell(x,y-j)){
        winArr.push(getCell(x,y-j));
        score+=1;
        j++;
    }
    gameOver(score);
}

function checkHorizontal(x,y) {
    let score = 1;
    let i = 1;
    while (getValueCell(x,y) === getValueCell(x+i,y)){
        score+=1;
        i++;
    }
    let j = 1;
    while (getValueCell(x,y) === getValueCell(x-j,y)){
        score+=1;
        j++;
    }

    gameOver(score);
}

function gameOver(score) {
    if(score >= 5){

        for (let i = 0; i < winArr.length; i++) {
            winArr[i].classList.add("win");
        }

        setTimeout(function () {
            alert("Win");
        },100);

    }
}

function checkCross1(x,y) {
    let score = 1;
    let i = 1;
    while (getValueCell(x,y) === getValueCell(x+i,y-i)){
        score+=1;
        i++;
    }
    let j = 1;
    while (getValueCell(x,y) === getValueCell(x-j,y+j)){
        score+=1;
        j++;
    }
    gameOver(score);
}

function checkCross2(x,y) {
    let score = 1;
    let i = 1;
    while (getValueCell(x,y) === getValueCell(x+i,y+i)){
        score+=1;
        i++;
    }
    let j = 1;
    while (getValueCell(x,y) === getValueCell(x-j,y-j)){
        score+=1;
        j++;
    }
    gameOver(score);
}

drawBoard();