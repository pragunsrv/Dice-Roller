let currentPlayerIndex = 0;
let players = [];

document.getElementById('numPlayers').addEventListener('change', function() {
    generatePlayerInputs();
});

document.getElementById('startGameButton').addEventListener('click', function() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
    if (numPlayers < 2 || numPlayers > 6) {
        alert('Please select between 2 and 6 players.');
        return;
    }
    setupPlayers(numPlayers);
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    updateCurrentPlayer();
    updateScores();
    updateHistory();
});

document.getElementById('rollButton').addEventListener('click', function() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('result').textContent = `You rolled a ${result}!`;
    const dice = document.getElementById('dice');
    dice.className = `dice shake`;
    resetDots();
    showDots(result);

    players[currentPlayerIndex].score += result;
    players[currentPlayerIndex].history.push(result);
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    setTimeout(() => {
        dice.classList.remove('shake');
    }, 500);

    const container = document.querySelector('.container');
    container.style.transform = 'scale(1.05)';
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 300);

    updateCurrentPlayer();
    updateScores();
    updateHistory();
});

function generatePlayerInputs() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
    const playerNamesDiv = document.getElementById('playerNames');
    playerNamesDiv.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Player ${i + 1} Name`;
        input.id = `playerName${i + 1}`;
        playerNamesDiv.appendChild(input);
        playerNamesDiv.appendChild(document.createElement('br')); // Add a line break for better readability
    }
}

function setupPlayers(num) {
    players = [];
    for (let i = 0; i < num; i++) {
        const input = document.getElementById(`playerName${i + 1}`);
        const name = input ? input.value.trim() || `Player ${i + 1}` : `Player ${i + 1}`;
        players.push({ name: name, score: 0, history: [] });
    }
}

function updateCurrentPlayer() {
    document.getElementById('currentPlayer').textContent = `${players[currentPlayerIndex].name}'s turn`;
}

function updateScores() {
    const playersScores = document.getElementById('playersScores');
    playersScores.innerHTML = '';
    players.forEach(player => {
        const playerScore = document.createElement('div');
        playerScore.textContent = `${player.name}: ${player.score}`;
        playersScores.appendChild(playerScore);
    });
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';
    players.forEach(player => {
        const history = document.createElement('div');
        history.textContent = `${player.name}'s Rolls: ${player.history.join(', ')}`;
        historyDiv.appendChild(history);
    });
}

function resetDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.classList.add('hidden');
    });
}

function showDots(result) {
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');
    const dot3 = document.getElementById('dot3');
    const dot4 = document.getElementById('dot4');
    const dot5 = document.getElementById('dot5');
    const dot6 = document.getElementById('dot6');
    const dot7 = document.getElementById('dot7');

    switch(result) {
        case 1:
            dot4.classList.remove('hidden');
            break;
        case 2:
            dot1.classList.remove('hidden');
            dot7.classList.remove('hidden');
            break;
        case 3:
            dot1.classList.remove('hidden');
            dot4.classList.remove('hidden');
            dot7.classList.remove('hidden');
            break;
        case 4:
            dot1.classList.remove('hidden');
            dot3.classList.remove('hidden');
            dot5.classList.remove('hidden');
            dot7.classList.remove('hidden');
            break;
        case 5:
            dot1.classList.remove('hidden');
            dot3.classList.remove('hidden');
            dot4.classList.remove('hidden');
            dot5.classList.remove('hidden');
            dot7.classList.remove('hidden');
            break;
        case 6:
            dot1.classList.remove('hidden');
            dot3.classList.remove('hidden');
            dot5.classList.remove('hidden');
            dot7.classList.remove('hidden');
            dot2.classList.remove('hidden');
            dot6.classList.remove('hidden');
            break;
    }
}
