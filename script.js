document.getElementById('rollButton').addEventListener('click', function() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('result').textContent = `You rolled a ${result}!`;
    const dice = document.getElementById('dice');
    dice.className = `dice shake ${getClassName(result)}`;

    // Adding shake animation
    setTimeout(() => {
        dice.classList.remove('shake');
    }, 500);

    // Adding a visual effect to the container
    const container = document.querySelector('.container');
    container.style.transform = 'scale(1.05)';
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 300);
});

function getClassName(result) {
    switch(result) {
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        case 4: return 'four';
        case 5: return 'five';
        case 6: return 'six';
    }
}
