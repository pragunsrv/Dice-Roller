let currentPlayer = 0;
let players = [];

document.getElementById('startGameButton').addEventListener('click', function() {
    const numPlayers = document.getElementById('numPlayers').value;
    setupPlayers(numPlayers);
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    updateCurrentPlayer();
    updateScores();
});

document.getElementById('rollButton').addEventListener('click', function() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('result').textContent = `You rolled a ${result}!`;
    const dice = document.getElementById('dice');
    dice.className = `dice shake`;
    resetDots();
    showDots(result);

    players[currentPlayer].score += result;
    currentPlayer = (currentPlayer + 1) % players.length;

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
});

function setupPlayers(num) {
    players = [];
    for (let i = 0; i < num; i++) {
        players.push({ id: i + 1, score: 0 });
    }
}

function updateCurrentPlayer() {
    document.getElementById('currentPlayer').textContent = `Player ${players[currentPlayer].id}'s turn`;
}

function updateScores() {
    const playersScores = document.getElementById('playersScores');
    playersScores.innerHTML = '';
    players.forEach(player => {
        const playerScore = document.createElement('div');
        playerScore.textContent = `Player ${player.id}: ${player.score}`;
        playersScores.appendChild(playerScore);
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
