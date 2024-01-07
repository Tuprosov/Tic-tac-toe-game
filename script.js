// create player moves' locations
let xPlayer = '';
let oPlayer = '';

// define every winning combinations 
const winners = ['123', '456', '789', '147', '258', '369', '159', '357'];

// creating a current player
let currentPlayer = 'X';
let gameOver = false;

// get all the cells, addeventlistener and get the new game button
const cells = Array.from(document.querySelectorAll('#gameBoard td'));
const message = document.getElementById("winMessage");
const newGame = document.getElementById("newGame");

startGame();

function startGame() {
    cells.forEach((cell) => cell.addEventListener('click', handleClick)) 
}

function handleClick (){
    // if game is finished dont do anything;
    if (gameOver) {
        return
    }

    if(!xPlayer.includes(this.id) && !oPlayer.includes(this.id)) {
        if(currentPlayer === 'X') {
            xPlayer += this.id;
            this.textContent = 'X';
            this.classList.add('hover');
        } else {
            oPlayer += this.id;
            this.textContent = 'O';
            this.classList.add('hover');
        }
    } else {
        return
    }

    if(checkWinner(xPlayer) || checkWinner(oPlayer)){
        message.style.display = 'block'
        message.textContent = `${currentPlayer} wins!`
        gameOver = true;
    } else {
        if(xPlayer.length == 5 && oPlayer.length == 4){
            message.style.display = 'block'
            message.textContent = "It's a draw!"
            gameOver = true;
        } 
    }

    // change players for the next move
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner(playerMoves) {
    return winners.some(combination => combination.split('')
                .every(cell => playerMoves.includes(cell)));
}

newGame.addEventListener('click', function() {
    xPlayer = '';
    oPlayer = '';
    currentPlayer = 'X';
    gameOver = false
    message.style.display = 'none';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('hover');
        cell.removeEventListener('click', handleClick)
    })

    startGame();
})
