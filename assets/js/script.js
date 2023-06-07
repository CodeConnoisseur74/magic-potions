var potions = [ "Blue", "Pink", "Green", "Yellow", "Red", "Purple" ];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function () {
    startGame();
};

function randomPotion() {
    return potions[ Math.floor(Math.random() * potions.length) ]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomPotion() + ".png";

            //Drag functionality
            tile.addEventListener("dragstart", dragStart); //click on potion, initialize the drag process
            tile.addEventListener("dragover", dragOver); //clicking on potion, move mouse to drag the potion
            tile.addEventListener("dragenter", dragEnter); //dragging potion ontu another potion
            tile.addEventListener("dragleave", dragLeave); //leave potion over another potion
            tile.addEventListener("drop", dragDrop); //dropping a potion over another potion
            tile.addEventListener("dragend", dragEnd); //after drag prcess completed, potions are swapped
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    //"this" refers to the tile to be clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //"this" refers to the other tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    let currCoords = currTile.id.split("-"); //id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[ 0 ]);
    let c = parseInt(currCoords[ 1 ]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[ 0 ]);
    let c2 = parseInt(otherCoords[ 1 ]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;

    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {

        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile = currImg;
    }
}

function matchPotions() {
    //matchFive()
    //matchFour()
    matchThree();
}

function matchThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let potion1 = board[ r ][ c ];
            let potion2 = board[ r ][ c + 1 ];
            let potion3 = board[ r ][ c + 2 ];
            if (potion1.src == potion2.src && potion2.src == potion3.src && !potion1.src.includes("blank")) {
                potion1.src = "./images/blank.png";
            }
        }
    }
}