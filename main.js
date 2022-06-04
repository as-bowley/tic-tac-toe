//Factory for the players
const Player = (name, tileType) => {
    const getName = () => name;
    const getTileType = () => tileType;
    return {getTileType}
}

//Module for the gameboard
const Gameboard = (() => {
    const board = new Array(9).fill('');
    const gameboardContainer = document.getElementById("gameboard");
    const winningNotification = document.getElementById("resultnotification");
    function displayBoard() {
        gameboardContainer.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            const tileButton = document.createElement('button');
            const index = i.toString();
            tileButton.classList.add('gameArrayTile');
            tileButton.setAttribute('id', `${index}`);
            tileButton.innerHTML = `${board[i]}`;
            gameboardContainer.appendChild(tileButton);
        }
    }

    function resetBoard() {
        board = new Array(9).fill('');
    }

    function placeTile(index, marker) {
        if(board[index] === '') {
            board[index] = Gameplay.checkCurrentPlayer();
        }
        Gameboard.checkWin();
    }

    function getBoard() {
        return gameboardCopy = [...board];
    }

    function checkWin() {
        const winningCombinations = [
            [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
            function arrayCompare() {
                for (let i = 0; i < winningCombinations.length; i++) {
                    const ind1 = winningCombinations[i][0];
                    const ind2 = winningCombinations[i][1];
                    const ind3 = winningCombinations[i][2];
                    if(board[ind1] === Gameplay.checkCurrentPlayer() && board[ind2] === Gameplay.checkCurrentPlayer() && board[ind3] === Gameplay.checkCurrentPlayer()) {
                        winningNotification.innerHTML = `${Gameplay.checkCurrentPlayer()} wins!`;
                    } else if(board.includes('') == false){
                        winningNotification.innerHTML = `It's a tie!~`;
                    }
                }
            }
        arrayCompare();
    }
        
    return {
        displayBoard,
        placeTile,
        getBoard,
        gameboardContainer,
        checkWin
    };
    })();

//Module for the gameplay
const Gameplay = ((player1, player2) => {

    let playerOne = Player('Alex', 'X');
    let playerTwo = Player('Mahira', 'O');
    let currentPlayerTile = playerOne.getTileType();

    const checkCurrentPlayer = () => {
        return currentPlayerTile;
    }

    const changePlayerTurn = () => { 
        if(currentPlayerTile === 'X') {
            currentPlayerTile = playerTwo.getTileType();
        } else {
            currentPlayerTile = playerOne.getTileType();
        }
    }

    const makeMove = (index) => {
        Gameboard.placeTile(index, checkCurrentPlayer());
        Gameboard.displayBoard();
        changePlayerTurn();
    }

    return {
        changePlayerTurn,
        makeMove,
        currentPlayerTile,
        checkCurrentPlayer
    }
})()


//unsorted code

Gameboard.gameboardContainer.addEventListener('click', function (e) {
    const clicked = e.target.id;
    const arrayLocation = Array.from(String(clicked), Number);
    Gameplay.makeMove(arrayLocation);
})

Gameboard.displayBoard();