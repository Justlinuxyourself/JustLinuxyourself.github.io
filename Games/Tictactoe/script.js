// script.js

const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

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

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkForWin();
    }
}

function checkForWin() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            // Handle win condition
            console.log(`${currentPlayer} wins!`);
        }
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
