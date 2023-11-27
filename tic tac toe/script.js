const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'T';
};

const handleClick = (cell, index) => {
    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                status.innerText = "It's a Tie!";
            } else {
                status.innerText = `Player ${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
};

const handleCellClick = (event) => {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-cell-index'));
    handleClick(cell, index);
};

const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.innerText = "Player X's turn";
    cells.forEach(cell => cell.innerText = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

