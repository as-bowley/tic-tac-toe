//Factory for the players
const Player = (name, tileType) => {
    const getName = () => name;
    const getTileType = () => tileType;
    return {getTileType, getName}
}

//Module for the gameboard
const Gameboard = (() => {
    let board = new Array(9).fill('');
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
        displayBoard();
        Gameplay.startGame();
        winningNotification.innerHTML = '';
    }

    function placeTile(index, marker) {
        if(board[index] === '') {
            board[index] = Gameplay.checkCurrentPlayerTile();
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
                    if(board[ind1] === Gameplay.checkCurrentPlayerTile() && board[ind2] === Gameplay.checkCurrentPlayerTile() && board[ind3] === Gameplay.checkCurrentPlayerTile()) {
                        winningNotification.innerHTML = `${Gameplay.getCurrentPlayerName()} wins!`;
                        Gameplay.stopGame();
                    } else if(board.includes('') == false){
                        winningNotification.innerHTML = `It's a tie!`;
                        Gameplay.stopGame();
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
        checkWin,
        resetBoard
    };
    })();

//Module for the gameplay
const Gameplay = ((player1, player2) => {

    let playerOne = Player('Player One', 'X');
    let playerTwo = Player('Player Two', 'O');
    let currentPlayer = playerOne;
    let currentPlayerTile = playerOne.getTileType();
    const startGameForm = document.querySelector(".game-start-popup");
    const formOverlay = document.getElementById("overlay");

    
    const getCurrentPlayerName = () => {
        return currentPlayer.getName();
    }

    const checkCurrentPlayerTile = () => {
        return currentPlayerTile;
    }

    const changePlayerTurn = () => { 
        if(currentPlayerTile === 'X') {
            currentPlayer = playerTwo;
            currentPlayerTile = playerTwo.getTileType();
        } else {
            currentPlayer = playerOne;
            currentPlayerTile = playerOne.getTileType();
        }
    }

    const makeMove = (index) => {
        Gameboard.placeTile(index, checkCurrentPlayerTile());
        Gameboard.displayBoard();
        changePlayerTurn();
    }

    const stopGame = () => {
        Gameboard.gameboardContainer.classList.add("disabled");
    }

    const startGame = () => {
        Gameboard.gameboardContainer.classList.remove("disabled");
        startGameForm.classList.add("hidden");
        formOverlay.classList.remove("active");
        setPlayerName();
    }

    const setPlayerName = () => {
        const playerOneName = document.getElementById("player1-name").value;
        const playerTwoName = document.getElementById("player2-name").value;const playerOneNameDisplay = document.getElementById("player1-name-display");
        const playerTwoNameDisplay = document.getElementById("player2-name-display");

        if(playerOneName != "" || playerTwoName != "" ) {
            playerOne = Player(playerOneName, 'X');
            playerTwo = Player(playerTwoName, 'O');
            playerOneNameDisplay.innerHTML = `<h2>${playerOneName}</h2>`;
            playerTwoNameDisplay.innerHTML = `<h2>${playerTwoName}</h2>`;
        }
    }

    const editName = () => {
        startGameForm.classList.remove("hidden");
        formOverlay.classList.add("active");
    }

    return {
        getCurrentPlayerName,
        checkCurrentPlayerTile,
        changePlayerTurn,
        makeMove,
        currentPlayerTile,
        stopGame,
        startGame,
        setPlayerName,
        editName
    }
})()


//unsorted code

Gameboard.gameboardContainer.addEventListener('click', function (e) {
    const clicked = e.target.id;
    const arrayLocation = Array.from(String(clicked), Number);
    Gameplay.makeMove(arrayLocation);
})

Gameboard.displayBoard();