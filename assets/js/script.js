var potions = [ "Blue", "Pink", "Green", "Yellow", "Red", "Purple" ];
var board = [];
var row = 9;
var columns = 9;
var score = 0;

window.onload = function () {
    startGame();
};

function randomPotion() {
    return potions[ Math.floor(Math.random() * potions.length) ]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < row; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString;
            tile.src = "./images/" + randomPotion() + ".png";

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}