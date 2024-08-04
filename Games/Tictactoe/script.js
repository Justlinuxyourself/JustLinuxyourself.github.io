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
        checkForTie();
    }
}

function checkForWin() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            // Handle win condition
            console.log(`${currentPlayer} wins!`);
            disableCells();
            displayMessage(`${currentPlayer} wins!`);
        }
    });
}

function checkForTie() {
    const allCellsFilled = Array.from(cells).every(cell => cell.textContent !== '');
    if (allCellsFilled) {
        console.log("It's a tie!");
        disableCells();
        displayMessage("It's a tie!");
    }
}

function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'absolute';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.fontSize = '36px';
    document.body.appendChild(messageElement);
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
