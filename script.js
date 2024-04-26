document.addEventListener("DOMContentLoaded", function() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const guessInput = document.getElementById("guess");
    const checkButton = document.getElementById("check-btn");
    const message = document.getElementById("message");
    let attempts = 0;

    checkButton.addEventListener("click", function() {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = "Por favor, insira um número válido entre 1 e 100.";
        } else {
            attempts++;
            if (guess === randomNumber) {
                message.textContent = `Parabéns! Você acertou o número em ${attempts} tentativas.`;
                checkButton.disabled = true;
            } else if (guess < randomNumber) {
                message.textContent = "Tente um número maior.";
            } else {
                message.textContent = "Tente um número menor.";
            }
        }
    });
});

