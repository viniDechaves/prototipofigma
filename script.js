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
    },
    // Adicione mais perguntas conforme desejado
    {
        question: "Qual é a moeda oficial do Japão?",
        options: ["a) Yuan", "b) Dólar", "c) Euro", "d) Iene"],
        correctAnswer: "d"
    },
    {
        question: "Quem pintou 'Mona Lisa'?",
        options: ["a) Leonardo da Vinci", "b) Pablo Picasso", "c) Vincent van Gogh", "d) Michelangelo"],
        correctAnswer: "a"
    },
    {
        question: "Em que ano a Primeira Guerra Mundial começou?",
        options: ["a) 1914", "b) 1918", "c) 1939", "d) 1945"],
        correctAnswer: "a"
    },
    // Adicione mais perguntas conforme desejado
];

var currentQuestionIndex = 0;
var totalMoney = 0;

function getRandomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

function displayQuestion() {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");

    var question = getRandomQuestion();
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
        var question = questions[currentQuestionIndex];
        if (selectedOption.value === question.correctAnswer) {
            totalMoney += 1000
