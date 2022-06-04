//Factory for the players
const Player = (name, tileType) => {
    const getName = () => name;
    const getTileType = () => tileType;
    return {getTileType}
}

//Module for the gameboard
const Gameboard = (() => {
    const board = new Array(9).fill('');
    const gameContainer = document.getElementById("gameboard");
    

    function displayBoard() {
        gameContainer.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            const tileButton = document.createElement('button');
            const index = i.toString();
            tileButton.classList.add('gameArrayTile');
            tileButton.setAttribute('id', `${index}`);
            tileButton.innerHTML = `${board[i]}`;
            gameContainer.appendChild(tileButton);
        }
    }

    function resetBoard() {
        board = new Array(9).fill('');
    }

    function placeTile(index, marker) {
        if(board[index] === '') {
            board[index] = Gameplay.currentPlayer.getTileType();
            Gameplay.changePlayerTurn();
        }
    }

    function getBoard() {
        return gameboardCopy = [...board];
    }

    function checkWin() {
        //check for a winner
    }
        
    return {
        displayBoard,
        placeTile,
        getBoard,
        gameContainer,
        checkWin
    };
    })();

//Module for the game's logic
const Gameplay = ((player1, player2) => {

    const playerOne = Player('Alex', 'X');
    const playerTwo = Player('Mahira', 'O');
    let currentPlayer = playerOne;

    const checkCurrentPlayer = () => {
        return currentPlayer;
    }

    const changePlayerTurn = (currentPlayer) => { 
        if(currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    const makeMove = (index) => {
        Gameboard.placeTile(index, currentPlayer.getTileType());
        Gameboard.displayBoard();
        changePlayerTurn(currentPlayer);
    }

    return {
        changePlayerTurn,
        makeMove,
        currentPlayer,
        checkCurrentPlayer
    }
})()


//unsorted code

Gameboard.gameContainer.addEventListener('click', function (e) {
    const clicked = e.target.id;
    const arrayLocation = Array.from(String(clicked), Number);
    Gameplay.makeMove(arrayLocation);
    console.log(Gameplay.currentPlayer)
})

Gameboard.displayBoard();


