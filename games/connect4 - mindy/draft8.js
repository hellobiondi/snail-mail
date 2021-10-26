import { loginGoogle, readFromDatabase, writeToDatabase } from "./module.js";
// import {readFromDatabase} from "./module.js";
// import {pushToDatabase} from "./module.js";

document.getElementById("loginGoogle").addEventListener("click", loginGoogle);
console.log(sessionStorage.currentUser);
var uid = sessionStorage.currentUser;
var dataList = {};

// if inside is empty, will becomes first player
async function initializePlayer() {
    var prop = "users/" + uid;
    var data = await readFromDatabase(prop);
    console.log(data); // {email: 'bokzmmindy@gmail.com', name: 'bok mindy', profile_picture: 'https://lh3.googleusercontent.com/a/AATXAJztuF0yzXyjB2lcv656YraWU00docU31bqpqWTN=s96-c'}
    dataList["email"] = data.email;
    dataList["name"] = data.name;
    dataList["profile_picture"] = data.profile_picture;
    dataList["friends"] = data.friends
    // console.log(dataList)fr
    writeToDatabase('games/connect4/game0001/players/1', `${dataList["email"]}`)
    startGame();
}
initializePlayer();
console.log(dataList)

// async function getPlayer(){
//     var property =  "games/connect4/game0001/currentPlayer";
//     var player = await readFromDatabase(property);
//     console.log(player);
//     return player;
//    }

   

// var prop = "users/" + uid;
//import {readFromDatabase} from "./module";

async function startGame() {
    //var tempProp = "games/connect4/game0001/currentPlayer";
    // var data = await readFromDatabase(tempProp);

    // test upddate db
    console.log("testing");
    // writeToDatabase("games/connect4/game0001/allmoves", "0,1/0,2");
    // writeToDatabase("games/connect4/game0001/lastmove", "6,9");
    // console.log(game);
    /*
    var player1Img = dataList["profile_picture"];
    var img1 = document.createElement('img');
    img1.src = player1Img;

    var player2Img = "https://lh3.googleusercontent.com/a-/AOh14GhDLPcnb0luPSDcNhVg2GrCHY3iZ0F9wAudT1nBtQ=s96-c";

    var img2 = document.createElement('img');
    img2.src = player2Img;
    */
    var player1Color = '#f88796'; //red
    var player2Color = '#fbb74c'; //yellow

    var UID1 = uid;
    var UID2 = 'bkLfaqpZH7TfCuXvajP3lbbmJBx2';

    console.log(typeof (dataList));
    var player1 = dataList["name"];
    var player2 = '1125';

    // Selectors
    var tableRow = document.getElementsByTagName('tr');
    var tableCell = document.getElementsByTagName('td');
    const playerTurn = document.querySelector('.player-turn');
    var tableSlot = document.querySelectorAll('.slot');
    const reset = document.querySelector('.reset');

    var property =  "games/connect4/game0001/currentPlayer";
    var currentPlayer = await readFromDatabase(property);
    //var currentPlayer = getPlayer();
    console.log(currentPlayer);
    playerTurn.textContent = `${player1}'s turn!`

    var temp = "";

    Array.prototype.forEach.call(tableCell, (cell) => {
        cell.addEventListener('click', changeColor);
        // Set all slots to white for new game.
        cell.style.backgroundColor = 'white';
    });

    function changeColor(e) { //the event
        // Get clicked column index
        let column = e.target.cellIndex;
        let row = [];

        for (var i = 5; i > -1; i--) {
            if (tableRow[i].children[column].style.backgroundColor == 'white') {
                row.push(tableRow[i].children[column]);
                writeToDatabase("games/connect4/game0001/lastmove", `${row[0].id}`);
                    temp += `${row[0].id}` + ",";
                    writeToDatabase("games/connect4/game0001/allmoves", temp);
                    console.log(row[0].id);
                if (currentPlayer === 1) {
                    row[0].style.backgroundColor = player1Color;
                    //ow[0].style.backgroundImage = player1Img; //red

                    if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()) {
                        playerTurn.textContent = `${player1} WINS!!`;
                        playerTurn.style.color = player1Color;
                        return alert(`${player1} WINS!!`);
                    } else if (drawCheck()) {
                        playerTurn.textContent = 'DRAW!';
                        return alert('DRAW!');
                    } else {
                        playerTurn.textContent = `${player2}'s turn`;
                        return currentPlayer = 2;
                    }

                } else {
                    row[0].style.backgroundColor = player2Color;
                    //row[0].style.backgroundImage = player2Img;
                    if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()) {
                        playerTurn.textContent = `${player2} WINS!!`;
                        playerTurn.style.color = player2Color;
                        return alert(`${player2} WINS!!`);
                    } else if (drawCheck()) {
                        playerTurn.textContent = 'DRAW!';
                        return alert('DRAW!');
                    } else {
                        playerTurn.textContent = `${player1}'s turn`;
                        return currentPlayer = 1;
                    }
                }
            }
        }

    }

    function colorMatchCheck(one, two, three, four) {
        return (one === two && one === three && one === four && one !== 'white');
        //return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
    }

    function horizontalCheck() {
        for (let row = 0; row < tableRow.length; row++) {
            for (let col = 0; col < 4; col++) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col + 1].style.backgroundColor,
                    tableRow[row].children[col + 2].style.backgroundColor, tableRow[row].children[col + 3].style.backgroundColor)) {
                    return true;
                }
            }
        }
    }

    function verticalCheck() {
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col].style.backgroundColor,
                    tableRow[row + 2].children[col].style.backgroundColor, tableRow[row + 3].children[col].style.backgroundColor)) {
                    return true;
                };
            }
        }
    }

    function diagonalCheck() {
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 3; row++) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row + 1].children[col + 1].style.backgroundColor,
                    tableRow[row + 2].children[col + 2].style.backgroundColor, tableRow[row + 3].children[col + 3].style.backgroundColor)) {
                    return true;
                }
            }
        }

    }

    function diagonalCheck2() {
        for (let col = 0; col < 4; col++) {
            for (let row = 5; row > 2; row--) {
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row - 1].children[col + 1].style.backgroundColor,
                    tableRow[row - 2].children[col + 2].style.backgroundColor, tableRow[row - 3].children[col + 3].style.backgroundColor)) {
                    return true;
                }
            }
        }
    }

    function drawCheck() {
        let fullSlot = []
        for (var i = 0; i < tableCell.length; i++) {
            if (tableCell[i].style.backgroundColor !== 'white') {
                fullSlot.push(tableCell[i]);
            }
        }
        if (fullSlot.length === tableCell.length) {
            return true;
        }
    }

    reset.addEventListener('click', () => {
        tableSlot.forEach(slot => {
            slot.style.backgroundColor = 'white';
        });
        playerTurn.style.color = 'black';
        return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
    });
}