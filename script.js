let players = [];
let currentPlayerIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Event listeners for changes
    document.getElementById('numPlayers').addEventListener('input', function() {
        generatePlayerInputs();
    });

    document.getElementById('startGameButton').addEventListener('click', function() {
        const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
        const numDice = parseInt(document.getElementById('numDice').value, 10);

        if (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 6) {
            alert('Please enter a number of players between 2 and 6.');
            return;
        }

        if (isNaN(numDice) || numDice < 1 || numDice > 4) {
            alert('Please enter a number of dice between 1 and 4.');
            return;
        }

        setupPlayers(numPlayers);
        generateDice(numDice);

        document.getElementById('playerSetup').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
        updateCurrentPlayer();
        updateScores();
        updateHistory();
    });

    document.getElementById('numDice').addEventListener('input', function() {
        generateDice();
    });

    document.getElementById('rollButton').addEventListener('click', function() {
        const numDice = parseInt(document.getElementById('numDice').value, 10);
        if (isNaN(numDice) || numDice < 1 || numDice > 4) {
            alert('Please select a valid number of dice to roll.');
            return;
        }

        const results = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
        const totalResult = results.reduce((a, b) => a + b, 0);

        document.getElementById('result').textContent = `You rolled: ${results.join(', ')} (Total: ${totalResult})!`;

        const diceElements = document.querySelectorAll('.dice');

        // Add shake class for animation
        diceElements.forEach(dice => dice.classList.add('shake'));

        // Reset dots and show appropriate ones
        diceElements.forEach((dice, index) => {
            const diceResult = results[index] || 1; // Default to 1 if fewer dice are rolled
            resetDots(dice);
            showDots(diceResult, dice);
        });

        // Update player score and history
        players[currentPlayerIndex].score += totalResult;
        players[currentPlayerIndex].history.push({ rolls: results });
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

        setTimeout(() => {
            diceElements.forEach(dice => dice.classList.remove('shake'));
        }, 500);

        updateCurrentPlayer();
        updateScores();
        updateHistory();
    });
});

function generatePlayerInputs() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
    const playerNamesContainer = document.getElementById('playerNames');
    if (!playerNamesContainer) return; // Ensure element exists
    playerNamesContainer.innerHTML = '';
    for (let i = 1; i <= numPlayers; i++) {
        playerNamesContainer.innerHTML += `
            <label for="player${i}">Player ${i} Name:</label>
            <input type="text" id="player${i}" placeholder="Player ${i}" required><br>
        `;
    }
}

function setupPlayers(numPlayers) {
    players = [];
    for (let i = 1; i <= numPlayers; i++) {
        const playerInput = document.getElementById(`player${i}`);
        if (!playerInput) {
            alert('One or more player name inputs are missing.');
            return;
        }
        const name = playerInput.value.trim();
        if (!name) {
            alert('Please enter names for all players.');
            return;
        }
        players.push({
            name: name,
            score: 0,
            history: []
        });
    }
    currentPlayerIndex = 0;
}

function generateDice(numDice) {
    const diceContainer = document.getElementById('diceContainer');
    if (!diceContainer) return; // Ensure element exists
    diceContainer.innerHTML = '';
    for (let i = 0; i < numDice; i++) {
        diceContainer.innerHTML += `
            <div class="dice dice${i + 1}"></div>
        `;
    }
    // Ensure the dots are reset and shown for new dice
    const diceElements = document.querySelectorAll('.dice');
    diceElements.forEach(dice => {
        resetDots(dice);
        showDots(1, dice); // Default to showing "1" for initialization
    });
}

function resetDots(dice) {
    while (dice.firstChild) {
        dice.removeChild(dice.firstChild);
    }
}

function showDots(number, dice) {
    const positions = {
        1: [[50, 50]],
        2: [[20, 20], [80, 80]],
        3: [[20, 20], [50, 50], [80, 80]],
        4: [[20, 20], [20, 80], [80, 20], [80, 80]],
        5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
        6: [[20, 20], [20, 50], [20, 80], [80, 20], [80, 50], [80, 80]]
    };

    positions[number].forEach(([topPercent, leftPercent]) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = `${topPercent}%`;
        dot.style.left = `${leftPercent}%`;
        dice.appendChild(dot);
    });
}

function updateCurrentPlayer() {
    const currentPlayerElement = document.getElementById('currentPlayer');
    if (currentPlayerElement) {
        currentPlayerElement.textContent = `Current Player: ${players[currentPlayerIndex].name}`;
    }
}

function updateScores() {
    const scoresElement = document.getElementById('playersScores');
    if (scoresElement) {
        scoresElement.innerHTML = '<h3>Scores:</h3>';
        players.forEach(player => {
            scoresElement.innerHTML += `<p>${player.name}: ${player.score}</p>`;
        });
    }
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    if (historyElement) {
        historyElement.innerHTML = '<h3>History:</h3>';
        players.forEach(player => {
            historyElement.innerHTML += `<h4>${player.name}</h4><ul>`;
            player.history.forEach((entry, index) => {
                historyElement.innerHTML += `<li>Turn ${index + 1}: Rolls: ${entry.rolls.join(', ')}, Total: ${entry.rolls.reduce((a, b) => a + b, 0)}</li>`;
            });
            historyElement.innerHTML += '</ul>';
        });
    }
}
