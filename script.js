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
    const result1 = Math.floor(Math.random() * 6) + 1;
    const result2 = Math.floor(Math.random() * 6) + 1;
    const totalResult = result1 + result2;

    document.getElementById('result').textContent = `You rolled a ${result1} and ${result2} (Total: ${totalResult})!`;

    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');

    // Add shake class for animation
    dice1.classList.add('shake');
    dice2.classList.add('shake');

    // Reset dots and show appropriate ones
    resetDots(1);
    resetDots(2);
    showDots(result1, 1);
    showDots(result2, 2);

    // Update player score and history
    players[currentPlayerIndex].score += totalResult;
    players[currentPlayerIndex].history.push({ dice1: result1, dice2: result2 });
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    setTimeout(() => {
        dice1.classList.remove('shake');
        dice2.classList.remove('shake');
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
        history.textContent = `${player.name}'s Rolls: ${player.history.map(r => `(${r.dice1}, ${r.dice2})`).join(', ')}`;
        historyDiv.appendChild(history);
    });
}

function resetDots(diceNumber) {
    const dots = document.querySelectorAll(`#dice${diceNumber} .dot`);
    dots.forEach(dot => {
        dot.style.display = 'none';
    });
}

function showDots(result, diceNumber) {
    const dice = document.getElementById(`dice${diceNumber}`);
    const dots = dice.querySelectorAll('.dot');

    // Reset all dots to hidden
    dots.forEach(dot => dot.style.display = 'none');

    switch(result) {
        case 1:
            dots[2].style.display = 'block';
            break;
        case 2:
            dots[0].style.display = 'block';
            dots[4].style.display = 'block';
            break;
        case 3:
            dots[0].style.display = 'block';
            dots[2].style.display = 'block';
            dots[4].style.display = 'block';
            break;
        case 4:
            dots[0].style.display = 'block';
            dots[1].style.display = 'block';
            dots[3].style.display = 'block';
            dots[4].style.display = 'block';
            break;
        case 5:
            dots[0].style.display = 'block';
            dots[1].style.display = 'block';
            dots[2].style.display = 'block';
            dots[3].style.display = 'block';
            dots[4].style.display = 'block';
            break;
        case 6:
            dots[0].style.display = 'block';
            dots[1].style.display = 'block';
            dots[2].style.display = 'block';
            dots[3].style.display = 'block';
            dots[4].style.display = 'block';
            dots[5].style.display = 'block';
            break;
    }
}
