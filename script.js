let questions = [];
let currentQuestion = 0;
let score = 0;

let questionText = document.getElementById("question");
let answerButtons = document.querySelectorAll(".answer");
let nextButton = document.getElementById("next");
let scoreText = document.getElementById("score");


// Get questions from API
fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response => response.json())
    .then(data => {

        questions = data.results;

        showQuestion();

    });


// Show question
function showQuestion() {

    let question = questions[currentQuestion];

    questionText.innerHTML = question.question;

    let answers = [
        question.correct_answer,
        ...question.incorrect_answers
    ];

    // Shuffle answers
    answers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < answerButtons.length; i++) {

        answerButtons[i].innerHTML = answers[i];

        answerButtons[i].onclick = function () {

            checkAnswer(answers[i]);

        };
    }
}


// Check answer
function checkAnswer(answer) {

    let correctAnswer =
        questions[currentQuestion].correct_answer;

    if (answer === correctAnswer) {

        score++;

        alert("Correct!");

    } else {

        alert("Wrong!");

    }

    scoreText.innerHTML = "Score: " + score;
}


// Next question
nextButton.onclick = function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        questionText.innerHTML =
            "Quiz Finished!";

        scoreText.innerHTML =
            "Final Score: " + score;

        for (let button of answerButtons) {
            button.style.display = "none";
        }

        nextButton.style.display = "none";
    }
};