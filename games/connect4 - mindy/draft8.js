// import { loginGoogle, readFromDatabase, writeToDatabase } from "./../../js/module.js";
import { readFromDatabase, writeToDatabase, isUserSignedIn } from "./../../js/module.js";
//import {readFromDatabase, writeToDatabase, isUserSignedIn} from "./../../js/module.js";

async function getData() {
    var uid = await isUserSignedIn();
    var property = "users/" + uid;
    sessionStorage.setItem("uid", uid);
    var data = await readFromDatabase(property);
    console.log(data);
    console.log(data["activeGames"]);
    console.log(Object.keys(data["activeGames"])); // --> list
    sessionStorage.setItem("opponentID", Object.keys(data["activeGames"])[0]);
    sessionStorage.setItem("gameID", Object.values(data["activeGames"])[0]);
    console.log(Object.values(data["activeGames"])); // --> list); // --> list
    for (var item in data) {
        sessionStorage.setItem(item, data[item]);
    }
}
getData();
console.log(sessionStorage);
var uid = sessionStorage.uid;
var email = sessionStorage.email;
var name = sessionStorage.name;
var opponentID = sessionStorage.opponentID;
var gameID = sessionStorage.gameID;
console.log(name);
console.log(opponentID);
console.log(gameID);
// var dataList = {};
// if inside is empty, will becomes first player
async function initializePlayer() {
    //var prop = "users/" + uid;
    // var data = await readFromDatabase(prop);
    // console.log(data); // {email: 'bokzmmindy@gmail.com', name: 'bok mindy', profile_picture: 'https://lh3.googleusercontent.com/a/AATXAJztuF0yzXyjB2lcv656YraWU00docU31bqpqWTN=s96-c'}
    // dataList["email"] = data.email;
    // dataList["name"] = data.name;
    // dataList["profile_picture"] = data.profile_picture;
    // dataList["friends"] = data.friends
    // console.log(dataList)fr

    startGame();
    console.log(email + "email");


}
initializePlayer();
// console.log(dataList)

// async function getPlayer(){
//     var property =  "games/connect4/game0001/currentPlayer";
//     var player = await readFromDatabase(property);
//     console.log(player);
//     return player;
//    }

//initialise board based on moves


// var prop = "users/" + uid;
//import {readFromDatabase} from "./module";

async function startGame() {
    //var tempProp = "games/connect4/game0001/currentPlayer";
    // var data = await readFromDatabase(tempProp);



    // test update db
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


    // Selectors
    var tableRow = document.getElementsByTagName('tr');
    var tableCell = document.getElementsByTagName('td');
    const playerTurn = document.querySelector('.player-turn');
    var tableSlot = document.querySelectorAll('.slot');
    const reset = document.querySelector('.reset');

    //var property = "games/connect4/game0001/currentPlayer";
    var property = "games/connect4/" + `${gameID}` + "/currentPlayer";
    var currentPlayer = await readFromDatabase(property);
    var currentUIDs = await readFromDatabase("games/connect4/" + `${gameID}` + "/players")
    var player1 = currentUIDs[1];
    var player2 = currentUIDs[2];

    console.log(currentUIDs[1]);
    //var currentPlayer = getPlayer();
    console.log(currentPlayer + ' currentPlayer')
    console.log(typeof currentPlayer + ' currentPlayer type');

    if (currentPlayer == 1) {
        playerTurn.style.color = player1Color;
        playerTurn.textContent = `${player1}'s turn`;
    }

    else {
        playerTurn.style.color = player2Color;
        playerTurn.textContent = `${player2}'s turn`;
    }

    if (uid === currentUIDs[currentPlayer]) {
        Array.prototype.forEach.call(tableCell, (cell) => {
            cell.addEventListener('click', changeColor);
            // Set all slots to white for new game.
            cell.style.backgroundColor = 'white';
        });
    }




    async function getGameBoard() {
        var prop = "games/connect4/" + `${gameID}` + "/allmoves"; // hardcoded game0001 for now
        var data = await readFromDatabase(prop);
        return data;
    }
    var gameBoard = await getGameBoard();
    console.log(gameBoard);

    if (gameBoard != null) {
        var gameBoardList = gameBoard.split(',');
        gameBoardList.pop();
        console.log(gameBoardList);
        setGameBoard();
    }

    else {
        gameBoard = '';
    }


    function setGameBoard() {
        var counter = 0;
        for (var move of gameBoardList) {
            var slot = document.getElementById(`${move}`);
            //console.log(slot);
            if (counter % 2 == 0) {
                slot.style.backgroundColor = '#f88796';
            }

            else {
                slot.style.backgroundColor = '#fbb74c';
            }
            counter++;

        }
    }

    async function changeColor(e) { //the event
        // Get clicked column index
        let column = e.target.cellIndex;
        let row = [];

        for (var i = 5; i > -1; i--) {
            if (tableRow[i].children[column].style.backgroundColor == 'white') {
                row.push(tableRow[i].children[column]);
                writeToDatabase("games/connect4/" + `${gameID}` + "/lastmove", `${row[0].id}`);
                console.log(gameBoard);
                gameBoard += `${row[0].id}` + ",";
                writeToDatabase("games/connect4/" + `${gameID}` + "/allmoves", gameBoard);
                console.log(row[0].id);
                if (currentPlayer === 1) {
                    row[0].style.backgroundColor = player1Color;
                    Array.prototype.forEach.call(tableCell, (cell) => {
                        cell.removeEventListener('click', changeColor);
                        // Set all slots to white for new game.
                    });
                    //ow[0].style.backgroundImage = player1Img; //red

                    if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()) {
                        playerTurn.textContent = `${player1} WINS!!`;
                        playerTurn.style.color = player1Color;
                        gameBoard = "";
                        writeToDatabase("games/connect4/" + `${gameID}` + "/allmoves", gameBoard);
                        writeToDatabase("games/connect4/" + `${gameID}` + "/lastmove", "");
                        var prop_temp = "games/connect4/" + `${gameID}` + "/win";
                        var winStr = await readFromDatabase(prop_temp);
                        console.log(winStr);
                        var winLi = winStr.split(',');
                        console.log(winLi);
                        winLi[0] = Number(winLi[0]) + 1;
                        var outputStr = winLi.join(',');
                        console.log(outputStr);
                        writeToDatabase(prop_temp, outputStr);

                        //writeToDatabase("games/connect4/game0001/lastmove", "");
                        tableSlot.forEach(slot => {
                            slot.style.backgroundColor = 'white';
                        });
                        return alert(`${player1} WINS!!`);
                    }

                    else if (drawCheck()) {
                        playerTurn.textContent = 'DRAW!';
                        return alert('DRAW!');
                    } else {
                        playerTurn.style.color = player2Color;

                        playerTurn.textContent = `${player2}'s turn`;
                        writeToDatabase("games/connect4/" + `${gameID}` + "/currentPlayer", 2);
                        return currentPlayer = 2;
                    }

                } else {
                    row[0].style.backgroundColor = player2Color;
                    Array.prototype.forEach.call(tableCell, (cell) => {
                        cell.removeEventListener('click', changeColor);
                        // Set all slots to white for new game.
                    });
                    //row[0].style.backgroundImage = player2Img;
                    if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()) {
                        playerTurn.textContent = `${player2} WINS!!`;
                        playerTurn.style.color = player2Color;
                        gameBoard = "";
                        writeToDatabase("games/connect4/" + `${gameID}` + "/allmoves", gameBoard);
                        writeToDatabase("games/connect4/" + `${gameID}` + "/lastmove", "");
                        var prop_temp = "games/connect4/" + `${gameID}` + "/win";
                        var winStr = await readFromDatabase(prop_temp);
                        console.log(winStr);
                        var winLi = winStr.split(',');
                        console.log(winLi);
                        winLi[1] = Number(winLi[1]) + 1;
                        var outputStr = winLi.join(',');
                        console.log(outputStr);
                        writeToDatabase(prop_temp, outputStr);
                        //writeToDatabase("games/connect4/game0001/lastmove", "");
                        tableSlot.forEach(slot => {
                            slot.style.backgroundColor = 'white';
                        });
                        return alert(`${player2} WINS!!`);
                    } else if (drawCheck()) {
                        playerTurn.textContent = 'DRAW!';
                        return alert('DRAW!');
                    } else {
                        playerTurn.style.color = player1Color;
                        playerTurn.textContent = `${player1}'s turn`;
                        writeToDatabase("games/connect4/" + `${gameID}` + "/currentPlayer", 1);
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
        return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
    });
}