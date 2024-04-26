var questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["a) São Paulo", "b) Rio de Janeiro", "c) Brasília", "d) Belo Horizonte"],
        correctAnswer: "c"
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["a) Marte", "b) Júpiter", "c) Vênus", "d) Saturno"],
        correctAnswer: "b"
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["a) William Shakespeare", "b) Miguel de Cervantes", "c) Charles Dickens", "d) Dante Alighieri"],
        correctAnswer: "b"
    }
    // Adicione mais perguntas conforme desejado
];

var currentQuestion = 0;
var totalMoney = 0;

function displayQuestion() {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");
    var question = questions[currentQuestion];

    questionElement.textContent = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach(function(option, index) {
        var li = document.createElement("li");
        var radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "option";
        radioButton.value = String.fromCharCode(97 + index); // Convertendo para a letra correspondente: a, b, c, d
        li.textContent = option;
        li.prepend(radioButton);
        optionsElement.appendChild(li);
    });
}

function checkAnswer() {
    var selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestion].correctAnswer) {
            totalMoney += 1000;
            document.getElementById("result").textContent = "Resposta correta! Você ganhou R$1.000!";
        } else {
            document.getElementById("result").textContent = "Resposta incorreta! Você não ganhou dinheiro desta vez.";
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    } else {
        alert("Por favor, selecione uma opção.");
    }
}

function endGame() {
    document.getElementById("question").textContent = "Fim do jogo!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("result").textContent = "Você ganhou um total de R$" + totalMoney + ".";
}

displayQuestion();


