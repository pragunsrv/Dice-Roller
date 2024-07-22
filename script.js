document.getElementById('rollButton').addEventListener('click', function() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('result').textContent = `You rolled a ${result}!`;
});
