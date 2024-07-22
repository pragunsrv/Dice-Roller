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

    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});

function generatePlayerInputs() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
    const playerNamesDiv = document.getElementById('playerNames');
    playerNamesDiv.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        playerNamesDiv.innerHTML += `
            <label for="player${i}">Player ${i + 1} Name:</label>
            <input type="text" id="player${i}" placeholder="Enter player name">
        `;
    }
}

function setupPlayers(numPlayers) {
    players = [];
    for (let i = 0; i < numPlayers; i++) {
        const name = document.getElementById(`player${i}`).value;
        if (!name) {
            alert('Please enter names for all players.');
            return;
        }
        players.push({ name, scores: [] });
    }

    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('currentPlayer').textContent = `Current Player: ${players[currentPlayerIndex].name}`;
}

function startGame(numDice, numSides) {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = '';

    for (let i = 0; i < numDice; i++) {
        const die = document.createElement('div');
        die.classList.add('dice');
        die.setAttribute('id', `dice${i + 1}`);
        diceContainer.appendChild(die);
    }
}
//function setupPlayers(numPlayers) {
  //  players = [];
    //for (let i = 0; i < numPlayers; i++) {
      //  const name = document.getElementById(`player${i}`).value;
        //if (!name) {
          //  alert('Please enter names for all players.');
            //return;
        //}
        //players.push({ name, scores: [] });
    //}

    //document.getElementById('playerSetup').classList.add('hidden');
    //document.getElementById('game').classList.remove('hidden');
    //document.getElementById('currentPlayer').textContent = `Current Player: ${players[currentPlayerIndex].name}`;
//}

//function startGame(numDice, numSides) {
  //  const diceContainer = document.getElementById('diceContainer');
    //diceContainer.innerHTML = '';

    //for (let i = 0; i < numDice; i++) {
     //   const die = document.createElement('div');
       // die.classList.add('dice');
        //die.setAttribute('id', `dice${i + 1}`);
        //diceContainer.appendChild(die);
    //}
//}

function rollDice() {
    const numDice = document.getElementById('diceContainer').children.length;
    let totalRoll = 0;

    for (let i = 0; i < numDice; i++) {
        const dice = document.getElementById(`dice${i + 1}`);
        const roll = Math.floor(Math.random() * 6) + 1; // Roll a die with 6 sides
        totalRoll += roll;
        updateDie(dice, roll);
    }

    const player = players[currentPlayerIndex];
    player.scores.push(totalRoll);
    updateHistory();

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    document.getElementById('currentPlayer').textContent = `Current Player: ${players[currentPlayerIndex].name}`;
    updatePlayersScores();
}

function updateDie(dice, roll) {
    dice.innerHTML = '';
    const dotConfigurations = getDotConfigurations(roll);
    dotConfigurations.forEach(config => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.classList.add(config);
        dice.appendChild(dot);
    });
}

function getDotConfigurations(number) {
    const configurations = {
        1: ['dot1'],
        2: ['dot1', 'dot5'],
        3: ['dot1', 'dot3', 'dot5'],
        4: ['dot1', 'dot2', 'dot4', 'dot5'],
        5: ['dot1', 'dot2', 'dot3', 'dot4', 'dot5'],
        6: ['dot1', 'dot2', 'dot3', 'dot4', 'dot5', 'dot6']
    };
    return configurations[number] || [];
}

function updatePlayersScores() {
    const playersScoresDiv = document.getElementById('playersScores');
    playersScoresDiv.innerHTML = '<h3>Players Scores:</h3>';
    players.forEach((player, index) => {
        const playerScore = player.scores.reduce((a, b) => a + b, 0);
        playersScoresDiv.innerHTML += `<p>${player.name}: ${playerScore}</p>`;
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
