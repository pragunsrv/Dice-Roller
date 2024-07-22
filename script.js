let players = [];
let currentPlayerIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numPlayers').addEventListener('input', function() {
        generatePlayerInputs();
    });

    document.getElementById('startGameButton').addEventListener('click', function() {
        const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
        const numDice = parseInt(document.getElementById('numDice').value, 10);
        const numSides = parseInt(document.getElementById('numSides').value, 10);

        if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 6) {
            alert('Please enter a number of players between 2 and 6.');
            return;
        }

        if (isNaN(numDice) || numDice < 1 || numDice > 4) {
            alert('Please enter a number of dice between 1 and 4.');
            return;
        }

        if (isNaN(numSides) || numSides < 6) {
            alert('Please enter a number of sides for each die (minimum 6).');
            return;
        }

        setupPlayers(numPlayers);
        startGame(numDice, numSides);
    });

    document.getElementById('rollButton').addEventListener('click', function() {
        rollDice();
    });

    document.getElementById('resetGameButton').addEventListener('click', function() {
        resetGame();
    });
});

function generatePlayerInputs() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
    const playerNamesDiv = document.getElementById('playerNames');
    playerNamesDiv.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Enter name for Player ${i + 1}`;
        input.id = `playerName${i + 1}`;
        playerNamesDiv.appendChild(input);
        playerNamesDiv.appendChild(document.createElement('br'));
    }
}

function setupPlayers(numPlayers) {
    players = [];
    for (let i = 0; i < numPlayers; i++) {
        const playerName = document.getElementById(`playerName${i + 1}`).value.trim();
        if (playerName) {
            players.push({ name: playerName, scores: [] });
        } else {
            alert('Please enter names for all players.');
            return;
        }
    }
    currentPlayerIndex = 0;
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('playerSetup').classList.add('hidden');
}

function startGame(numDice, numSides) {
    createDice(numDice, numSides);
    updateCurrentPlayer();
    updateScores();
    updateHistory();
}

function createDice(numDice, numSides) {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = '';
    for (let i = 0; i < numDice; i++) {
        const dice = document.createElement('div');
        dice.className = `dice dice${numSides}`;
        diceContainer.appendChild(dice);
    }
}

function rollDice() {
    const dice = document.querySelectorAll('.dice');
    dice.forEach(die => {
        const numSides = parseInt(document.getElementById('numSides').value, 10);
        const result = Math.floor(Math.random() * numSides) + 1;
        updateDie(die, result);
        players[currentPlayerIndex].scores.push(result);
    });

    // Move to the next player
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayer();
    updateScores();
    updateHistory();
}

function updateDie(die, result) {
    die.innerHTML = '';
    const dotPositions = {
        1: [[50, 50]],
        2: [[25, 25], [75, 75]],
        3: [[25, 25], [50, 50], [75, 75]],
        4: [[25, 25], [25, 75], [75, 25], [75, 75]],
        5: [[25, 25], [25, 75], [50, 50], [75, 25], [75, 75]],
        6: [[25, 25], [25, 50], [25, 75], [75, 25], [75, 50], [75, 75]]
    };

    dotPositions[result].forEach(position => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = `${position[0]}%`;
        dot.style.left = `${position[1]}%`;
        die.appendChild(dot);
    });
    
    die.classList.add('shake');
    setTimeout(() => die.classList.remove('shake'), 500);
}

function updateCurrentPlayer() {
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('currentPlayer').textContent = `Current Player: ${currentPlayer.name}`;
}

function updateScores() {
    const scoresDiv = document.getElementById('playersScores');
    scoresDiv.innerHTML = '<h3>Scores:</h3>';
    players.forEach(player => {
        const playerScore = player.scores.reduce((a, b) => a + b, 0);
        scoresDiv.innerHTML += `<p>${player.name}: ${playerScore}</p>`;
    });
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '<h3>History:</h3>';
    players.forEach((player, index) => {
        historyDiv.innerHTML += `<h4>${player.name}</h4>`;
        player.scores.forEach((score, i) => {
            historyDiv.innerHTML += `<p>Roll ${i + 1}: ${score}</p>`;
        });
    });
}

function resetGame() {
    document.getElementById('playerSetup').classList.remove('hidden');
    document.getElementById('game').classList.add('hidden');
    document.getElementById('numPlayers').value = '';
    document.getElementById('numDice').value = '';
    document.getElementById('numSides').value = '';
    document.getElementById('playerNames').innerHTML = '';
    document.getElementById('diceContainer').innerHTML = '';
    document.getElementById('result').textContent = '';
    document.getElementById('currentPlayer').textContent = '';
    document.getElementById('playersScores').innerHTML = '';
    document.getElementById('history').innerHTML = '';
    players = [];
    currentPlayerIndex = 0;
}
