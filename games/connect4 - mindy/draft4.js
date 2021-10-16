// // prompt player name
// while (!player1){
//     var player1 = prompt('Player One: Enter your name. You will be Pink.');
// };
var player1Color = '#f88796'; //red

// while (!player2){
//     var player2 = prompt('Player Two: Enter your name. You will be yellow.');
// };
var player2Color = '#fbb74c'; //yellow

// user1 UID = kJS1iV1YQQeDUpBZiZ9O1TlcvZ53
// user2 UID = bkLfaqpZH7TfCuXvajP3lbbmJBx2

var UID1 = 'kJS1iV1YQQeDUpBZiZ9O1TlcvZ53';
var UID2 = 'bkLfaqpZH7TfCuXvajP3lbbmJBx2';

var url = "server/chat.php";
axios.get(url) 
.then(response => {
    // let rows = '';
    console.log(response.data);
    console.log(response.data.users[UID1].name);
    console.log(response.data.users[UID2].name);
    var player1 = response.data.users[UID1].name.toString();
    var player2 = response.data.users[UID2].name.toString();
    // player1Color = 'response.data.users[UID1].profile_picture'; //red
    //player2Color = '#response.data.users[UID2].profile_picture'; //yellow
   

    // Selectors
    var tableRow = document.getElementsByTagName('tr');
    var tableCell = document.getElementsByTagName('td');
    const playerTurn = document.querySelector('.player-turn');
    var tableSlot = document.querySelectorAll('.slot');
    const reset = document.querySelector('.reset');

    var currentPlayer =1;
    playerTurn.textContent = `${player1}'s turn!`

    for (let i=0; i<tableCell.length; i++){
        tableCell[i].addEventListener('click', (e) =>{
            console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
        });
    }

    Array.prototype.forEach.call(tableCell, (cell) => {
        cell.addEventListener('click', changeColor);
        // Set all slots to white for new game.
        cell.style.backgroundColor = 'white';
    });

    function changeColor(e){ //the event
        // Get clicked column index
        let column = e.target.cellIndex;
        let row = [];

        for (i = 5; i > -1; i--){
            if (tableRow[i].children[column].style.backgroundColor == 'white'){
                row.push(tableRow[i].children[column]);
                if (currentPlayer === 1){
                    row[0].style.backgroundColor = player1Color; //red
                    if (horizontalCheck() || verticalCheck() || diagonalCheck()|| diagonalCheck2()){
                        playerTurn.textContent = `${player1} WINS!!`;
                        playerTurn.style.color = player1Color;
                        return alert(`${player1} WINS!!`);
                    }else if (drawCheck()){
                        playerTurn.textContent = 'DRAW!';
                        return alert('DRAW!');
                    }else{
                        playerTurn.textContent = `${player2}'s turn`;
                        return currentPlayer = 2;
                    }
                    
                }else{
                    row[0].style.backgroundColor = player2Color;
                    if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                        playerTurn.textContent = `${player2} WINS!!`;
                        playerTurn.style.color = player2Color;
                        return alert(`${player2} WINS!!`);
                    }else if (drawCheck()){
                        playerTurn.textContent = 'DRAW!';
                        return alert('DRAW!');
                    }else{
                        playerTurn.textContent = `${player1}'s turn`;
                        return currentPlayer = 1;
                    }
                }
            }
        }
    
    }

    function colorMatchCheck(one, two, three, four){
        return (one === two && one === three && one === four && one !== 'white');
        //return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
    }

    function horizontalCheck(){
        for (let row = 0; row < tableRow.length; row++){
            for (let col =0; col < 4; col++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, 
                                    tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
                return true;
            }
            }
        }
    }

    function verticalCheck(){
        for (let col = 0; col < 7; col++){
            for (let row = 0; row < 3; row++){
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                                    tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
                    return true;
                };
            }   
        }
    }

    function diagonalCheck(){
        for(let col = 0; col < 4; col++){
            for (let row = 0; row < 3; row++){
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
                    tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                        return true;
                    }
                }
            }

    }

    function diagonalCheck2(){
        for(let col = 0; col < 4; col++){
            for (let row = 5; row > 2; row--){
                if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
                    tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                        return true;
                }
            }
        }
    }

    function drawCheck(){
        let fullSlot = []
        for (i=0; i < tableCell.length; i++){
            if (tableCell[i].style.backgroundColor !== 'white'){
                fullSlot.push(tableCell[i]);
            }
        }
        if (fullSlot.length === tableCell.length){
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
    })
    .catch(error => {
        // console.log(error);
        // output.innerHTML = "Error: HTTP status=" + error;
        console.log(error)
    })