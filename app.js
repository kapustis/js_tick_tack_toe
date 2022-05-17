/**
We store our game status element here to allow us to more easily
use it later on
*/
const statusDisplay = document.querySelector('.game--status');
/**
We will use gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/**
We will store our current player here, so we know whose turn
*/
let currentPlayer = "X";
/**
 * We will store our current game state here, in the form of empty strings in an array
 *  will allow us to easily track played cells and validate the game state later on
 * @type {string[]}
 */
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/**
 * some messages that we will display to the user during the game.
 */
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/**
 * set the initial message to let the players know whose turn it is
 * @type {string}
 */
statusDisplay.innerHTML = currentPlayerTurn();

/**
 *
 * @param clickedCell
 * @param clickedCellIndex
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");

    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

/**
 *
 * @param clickedCellEvent
 */
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; //We will save the clicked HTML element in a variable for easier further use

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); //grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        console.log(`RETURN ${clickedCellIndex}`);
        console.log(`RETURN ${gameState}`);
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

/**
 *
 */
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

console.log(document.querySelectorAll('.cell'))

/**
 * add our event listeners to the actual game cells, as well as our restart button
 *
 * */

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
