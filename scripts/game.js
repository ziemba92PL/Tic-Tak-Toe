function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please se custom player names for both players!');
         return;
     }
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}



function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    console.log(players[activePlayer].name);

    activePlayerNameElement.textContent = players[activePlayer].name;
}

let board = ['', '', '', '', '', '', '', '', '']

function selectGameField(event) {
    if (event.target.tagName !== 'LI') {
        return;
    }

    const selectedField = event.target;
    
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field!');
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; //players[0]
    selectedField.classList.add('disabled');
    
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    const winnerId = checkForGameOver();
    
    if (winnerId !==0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
    endGame(winnerId);
}


function checkForGameOver() {
    // Checking the rows for equality
    for (let i = 0; i < 3; i++) {
        if (
                gameData[i][0] > 0 &&
                gameData[i][0] === gameData[i][1] &&
                gameData[i][1] === gameData[i][2] 
        )  {
            return gameData[i][0];
        }
    }

    // Checking the columns for equality
    for (let i = 0; i < 3; i++) { 
        if (
             gameData[0][i] > 0 &&
             gameData[0][i] === gameData[1][i] &&
             gameData[0][i] === gameData[2][i] 
         )  {
             return gameData[0][i];
         }
     
    }     
         
    // Diagonal: Top left to bottom right
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] && 
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }

    // Diagonal: Bottom left to top right
    if(
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }
    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';
    
    if (winnerId > 0) {
        
        const winnerName = players[winnerId - 1].name;
        console.log(winnerName);
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
        
    } else  {
               gameOverElement.firstElementChild.textContent = 'It\'s a draw!';
    }
   
}