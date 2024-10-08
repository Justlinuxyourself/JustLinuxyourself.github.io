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
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];

        if (cellA.textContent && cellA.textContent === cellB.textContent && cellA.textContent === cellC.textContent) {
            const winningPlayer = cellA.textContent;
            console.log(`${winningPlayer} wins!`);
            disableCells();
            displayMessage(`${winningPlayer} wins!`);
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
    cells.forEach(cell => cell.removeEventListener('touchstart', handleClick));
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

const resetButton = document.getElementById('reset-button');

function resetGame() {
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('touchstart', handleClick);
        cell.addEventListener('touchstart', handleClick);
    });
}

resetButton.addEventListener('click', resetGame);

cells.forEach(cell => {
    cell.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent scrolling
        handleClick(event);
    });
});
