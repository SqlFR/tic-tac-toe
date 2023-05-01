
const Player = (name, symbol) => {
    return { name, symbol }
}


const gameBoard = (() => {

    const board = [];
    let boxArray = []

    const grid = document.querySelector('.grid');
    const popUpResult = document.createElement('div');
    const body = document.querySelector('body')
    popUpResult.className = 'result';
    body.appendChild(popUpResult);


    for (let i = 0; i < 9; i++) {
        board.push({index: i, check: 'notChecked'})
        const box = document.createElement('div');
        box.id = i;
        boxArray.push(box)
        box.className = 'box';
        grid.appendChild(box);
    }

    function onClickBox(e) {
        gameController.addMark(e.currentTarget.id) 
    }
    boxArray.forEach((box) => {
        box.addEventListener('click', onClickBox);
    })


    
    return { board, grid, popUpResult, boxArray, onClickBox }
})();

const gameController = (() => {

    const player1 = Player('Player One', '⚔️');
    const player2 = Player('Player Two', '🛡️');

    let markPlayer1 = [];
    let markPlayer2 = [];

    const wonCombinaisons = [[0, 1, 2], [0, 3, 6], [2, 5, 8],
                             [6, 7, 8], [3, 4, 5], [1, 4, 7],
                             [0, 4, 8], [2, 4, 6]]

    let activePlayer = player1;

    function addMarkPlayer(box, symbol) {
        if(symbol === '⚔️') {
            markPlayer1.push(gameBoard.board[box].index)
            checkWinner(markPlayer1, player1);
        } else {
            markPlayer2.push(gameBoard.board[box].index)
            checkWinner(markPlayer2, player2);
        }
    }

    function checkWinner(array, player) {
        let found = false;
        for (let i = 0; i < wonCombinaisons.length; i++) {
            const winningCombination = wonCombinaisons[i];
            const matchingNumbers = winningCombination.filter(num => array.includes(num));
        if (matchingNumbers.length >= 3) {
            found = true;
            endGame();
            break;
        }
    }
        if((markPlayer1.length + markPlayer2.length === 9)) {
            gameBoard.popUpResult.textContent = 'It\' a tie !';
            endGame();
        }
        if (found) {
            gameBoard.popUpResult.textContent = `The Winner is ${player.name} !`
        }
    };

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
        
    }

    const getActivePlayer = () => activePlayer;

    const addMark = (box) => {
        if(gameBoard.board[box].check === 'notChecked') {
            const symbol = getActivePlayer().symbol;
            gameBoard.board[box].value = symbol;
            dislayController(box, symbol);
            addMarkPlayer(box, symbol)
            switchPlayerTurn();
        }        
    }

    const endGame = () => {
        gameBoard.popUpResult.style.display = 'flex';
        gameBoard.boxArray.forEach((box) => {
            box.removeEventListener('click', gameBoard.onClickBox)
        })
    }

    return { getActivePlayer, addMark }
})();

const dislayController = ((box, symbol) => {

    let index = gameBoard.board[box].index;

    gameBoard.board[box].check = 'check'; // Changement d'état de la box
    gameBoard.grid.children[index].textContent = symbol;
});


/// Fonctions Diverses

function isEqual(array1, array2) {
    if(array1.length !== array2.length) return false

    return array1.every((value, index) => value === array2[index])
}

