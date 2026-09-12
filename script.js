// ============================================================
// QUESTION BANK
// 3 QUESTIONS PER DIFFICULTY
// ============================================================

const questionBank = {

    // ========================================================
    // EASY
    // ========================================================

    easy: [

        {
            question: "What is the capital of India?",

            options: [
                "Mumbai",
                "New Delhi",
                "Kolkata",
                "Chennai"
            ],

            answer: 1,

            hint: "It is the capital city of India."
        },


        {
            question: "Which planet is known as the Red Planet?",

            options: [
                "Earth",
                "Venus",
                "Mars",
                "Jupiter"
            ],

            answer: 2,

            hint: "This planet has a reddish appearance."
        },


        {
            question: "What is H2O commonly known as?",

            options: [
                "Oxygen",
                "Hydrogen",
                "Water",
                "Salt"
            ],

            answer: 2,

            hint: "You drink it every day."
        }

    ],


    // ========================================================
    // MEDIUM
    // ========================================================

    medium: [

        {
            question: "Who wrote the Indian National Anthem?",

            options: [
                "Rabindranath Tagore",
                "Mahatma Gandhi",
                "Jawaharlal Nehru",
                "Sarojini Naidu"
            ],

            answer: 0,

            hint: "He was a famous Bengali poet."
        },


        {
            question: "What is the largest ocean in the world?",

            options: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Pacific Ocean",
                "Arctic Ocean"
            ],

            answer: 2,

            hint: "It is between Asia/Australia and the Americas."
        },


        {
            question: "Which is the smallest prime number?",

            options: [
                "0",
                "1",
                "2",
                "3"
            ],

            answer: 2,

            hint: "It is the only even prime number."
        }

    ],


    // ========================================================
    // HARD
    // ========================================================

    hard: [

        {
            question: "Which element has the chemical symbol Au?",

            options: [
                "Silver",
                "Gold",
                "Copper",
                "Iron"
            ],

            answer: 1,

            hint: "It is a precious yellow metal."
        },


        {
            question: "What is the SI unit of electric resistance?",

            options: [
                "Volt",
                "Watt",
                "Ohm",
                "Ampere"
            ],

            answer: 2,

            hint: "Its symbol is Ω."
        },


        {
            question: "Who developed the theory of general relativity?",

            options: [
                "Isaac Newton",
                "Albert Einstein",
                "Galileo Galilei",
                "Stephen Hawking"
            ],

            answer: 1,

            hint: "He is famous for E = mc²."
        }

    ]

};


// ============================================================
// VARIABLES
// ============================================================

let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;

let timeLeft = 10;

let timer;

let selectedDifficulty = "easy";

let hintUsed = false;


// ============================================================
// LIVES
// ============================================================

let lives = 3;


// ============================================================
// RESULT ANALYSIS
// ============================================================

let correctAnswers = 0;

let wrongAnswers = 0;

let timeOutAnswers = 0;


// ============================================================
// HTML ELEMENTS
// ============================================================

const startBox =
    document.getElementById("startBox");

const quizBox =
    document.getElementById("quizBox");

const resultBox =
    document.getElementById("resultBox");

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const questionNumberElement =
    document.getElementById("questionNumber");

const scoreElement =
    document.getElementById("score");

const highScoreElement =
    document.getElementById("highScore");

const startHighScore =
    document.getElementById("startHighScore");

const timerElement =
    document.getElementById("timer");

const livesElement =
    document.getElementById("lives");

const difficultyDisplay =
    document.getElementById("difficultyDisplay");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextButton");

const progressBar =
    document.getElementById("progressBar");

const hintButton =
    document.getElementById("hintButton");

const hintText =
    document.getElementById("hintText");

const finalScore =
    document.getElementById("finalScore");

const correctAnswersElement =
    document.getElementById("correctAnswers");

const wrongAnswersElement =
    document.getElementById("wrongAnswers");

const timeOutAnswersElement =
    document.getElementById("timeOutAnswers");

const percentageElement =
    document.getElementById("percentage");

const remainingLivesElement =
    document.getElementById("remainingLives");

const resultMessage =
    document.getElementById("resultMessage");

const finalHighScore =
    document.getElementById("finalHighScore");

const restartButton =
    document.getElementById("restartButton");

const changeDifficultyButton =
    document.getElementById(
        "changeDifficultyButton"
    );


// ============================================================
// HIGH SCORE
// ============================================================

let highScore =
    Number(
        localStorage.getItem("quizHighScore")
    ) || 0;


// ============================================================
// DISPLAY HIGH SCORE
// ============================================================

function displayHighScore() {

    highScoreElement.textContent =
        `🏆 High Score: ${highScore}`;


    startHighScore.textContent =
        highScore;

}


// ============================================================
// DISPLAY LIVES
// ============================================================

function displayLives() {

    let hearts = "";


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        if (i < lives) {

            hearts += "❤️";

        }

        else {

            hearts += "🖤";

        }

    }


    livesElement.textContent =
        hearts;

}


// ============================================================
// SHUFFLE QUESTIONS
// ============================================================

function shuffleQuestions() {

    quizQuestions =
        [...questionBank[selectedDifficulty]];


    for (
        let i = quizQuestions.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            quizQuestions[i],
            quizQuestions[randomIndex]
        ] =
        [
            quizQuestions[randomIndex],
            quizQuestions[i]
        ];

    }

}


// ============================================================
// START QUIZ
// ============================================================

function startQuiz(difficulty) {

    selectedDifficulty =
        difficulty;


    currentQuestion = 0;

    score = 0;

    answered = false;

    hintUsed = false;

    lives = 3;


    correctAnswers = 0;

    wrongAnswers = 0;

    timeOutAnswers = 0;


    shuffleQuestions();


    startBox.classList.add(
        "hidden"
    );


    resultBox.classList.add(
        "hidden"
    );


    quizBox.classList.remove(
        "hidden"
    );


    displayLives();


    loadQuestion();

}


// ============================================================
// LOAD QUESTION
// ============================================================

function loadQuestion() {

    clearInterval(timer);


    timeLeft = 10;


    timerElement.textContent =
        "⏱️ 10s";


    timerElement.style.color =
        "#e63946";


    answered = false;

    hintUsed = false;


    const question =
        quizQuestions[currentQuestion];


    questionElement.textContent =
        question.question;


    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;


    scoreElement.textContent =
        `Score: ${score}`;


    displayHighScore();

    displayLives();


    difficultyDisplay.textContent =
        `Difficulty: ${capitalize(selectedDifficulty)}`;


    feedbackElement.textContent =
        "";


    hintText.textContent =
        "";


    hintButton.disabled =
        false;


    optionsElement.innerHTML =
        "";


    nextButton.style.display =
        "none";


    nextButton.textContent =
        "Next ➜";


    const progress =
        (
            (currentQuestion + 1) /
            quizQuestions.length
        ) * 100;


    progressBar.style.width =
        `${progress}%`;


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                `${String.fromCharCode(65 + index)}. ${option}`;


            button.classList.add(
                "option-button"
            );


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            optionsElement.appendChild(
                button
            );

        }
    );


    startTimer();

}


// ============================================================
// CAPITALIZE
// ============================================================

function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}


// ============================================================
// TIMER
// ============================================================

function startTimer() {

    timer =
        setInterval(
            () => {

                timeLeft--;


                timerElement.textContent =
                    `⏱️ ${timeLeft}s`;


                if (timeLeft <= 3) {

                    timerElement.style.color =
                        "#dc2626";

                }


                if (timeLeft <= 0) {

                    clearInterval(timer);

                    timeUp();

                }

            },
            1000
        );

}


// ============================================================
// HINT
// ============================================================

hintButton.addEventListener(
    "click",
    () => {

        if (
            hintUsed ||
            answered
        ) {

            return;

        }


        hintUsed = true;


        const question =
            quizQuestions[currentQuestion];


        hintText.textContent =
            `💡 Hint: ${question.hint}`;


        hintButton.disabled =
            true;

    }
);


// ============================================================
// CHECK ANSWER
// ============================================================

function checkAnswer(
    selectedAnswer,
    selectedButton
) {

    if (answered) {

        return;

    }


    answered = true;


    clearInterval(timer);


    const correctAnswer =
        quizQuestions[
            currentQuestion
        ].answer;


    const allButtons =
        document.querySelectorAll(
            ".option-button"
        );


    allButtons.forEach(
        button => {

            button.disabled = true;

        }
    );


    if (
        selectedAnswer ===
        correctAnswer
    ) {

        selectedButton.classList.add(
            "correct"
        );


        correctAnswers++;


        if (hintUsed) {

            score += 0.5;


            feedbackElement.textContent =
                "✅ Correct! +0.5 point (Hint used)";

        }

        else {

            score++;


            feedbackElement.textContent =
                "✅ Correct! +1 point";

        }


        scoreElement.textContent =
            `Score: ${score}`;

    }

    else {

        selectedButton.classList.add(
            "wrong"
        );


        wrongAnswers++;


        lives--;


        displayLives();


        allButtons[
            correctAnswer
        ].classList.add(
            "correct"
        );


        feedbackElement.textContent =
            `❌ Wrong! Correct answer: ${quizQuestions[currentQuestion].options[correctAnswer]}`;


        if (lives <= 0) {

            feedbackElement.textContent =
                "💔 Game Over! You lost all your lives.";

            nextButton.textContent =
                "📊 View Results";

        }

    }


    nextButton.style.display =
        "block";

}


// ============================================================
// TIME UP
// ============================================================

function timeUp() {

    if (answered) {

        return;

    }


    answered = true;


    const correctAnswer =
        quizQuestions[
            currentQuestion
        ].answer;


    const allButtons =
        document.querySelectorAll(
            ".option-button"
        );


    allButtons.forEach(
        button => {

            button.disabled = true;

        }
    );


    allButtons[
        correctAnswer
    ].classList.add(
        "correct"
    );


    timeOutAnswers++;


    lives--;


    displayLives();


    feedbackElement.textContent =
        `⏰ Time's Up! Correct answer: ${quizQuestions[currentQuestion].options[correctAnswer]}`;


    if (lives <= 0) {

        feedbackElement.textContent =
            "💔 Game Over! You lost all your lives.";

        nextButton.textContent =
            "📊 View Results";

    }


    nextButton.style.display =
        "block";

}


// ============================================================
// NEXT QUESTION
// ============================================================

nextButton.addEventListener(
    "click",
    () => {

        if (lives <= 0) {

            showResult();

            return;

        }


        currentQuestion++;


        if (
            currentQuestion <
            quizQuestions.length
        ) {

            loadQuestion();

        }

        else {

            showResult();

        }

    }
);


// ============================================================
// SHOW RESULT
// ============================================================

function showResult() {

    clearInterval(timer);


    quizBox.classList.add(
        "hidden"
    );


    resultBox.classList.remove(
        "hidden"
    );


    const totalQuestions =
        quizQuestions.length;


    const percentage =
        Math.round(
            (
                correctAnswers /
                totalQuestions
            ) * 100
        );


    finalScore.textContent =
        `${score} / ${totalQuestions}`;


    correctAnswersElement.textContent =
        correctAnswers;


    wrongAnswersElement.textContent =
        wrongAnswers;


    timeOutAnswersElement.textContent =
        timeOutAnswers;


    percentageElement.textContent =
        `${percentage}%`;


    remainingLivesElement.textContent =
        lives;


    // ========================================================
    // PERFORMANCE MESSAGE
    // ========================================================

    if (lives <= 0) {

        resultMessage.textContent =
            "💔 You lost all your lives. Keep practicing and try again!";

    }

    else if (
        percentage === 100
    ) {

        resultMessage.textContent =
            "🏆 Perfect! You answered every question correctly!";

    }

    else if (
        percentage >= 80
    ) {

        resultMessage.textContent =
            "👏 Excellent performance! Your general knowledge is strong.";

    }

    else if (
        percentage >= 60
    ) {

        resultMessage.textContent =
            "👍 Good job! You have a good level of knowledge.";

    }

    else if (
        percentage >= 40
    ) {

        resultMessage.textContent =
            "📚 Not bad! Keep practicing to improve your score.";

    }

    else {

        resultMessage.textContent =
            "💪 Keep learning! Practice will help you improve.";

    }


    // ========================================================
    // HIGH SCORE
    // ========================================================

    if (score > highScore) {

        highScore = score;


        localStorage.setItem(
            "quizHighScore",
            highScore
        );

    }


    finalHighScore.textContent =
        `🏆 High Score: ${highScore}`;

}


// ============================================================
// PLAY AGAIN
// ============================================================

restartButton.addEventListener(
    "click",
    () => {

        startQuiz(
            selectedDifficulty
        );

    }
);


// ============================================================
// CHANGE DIFFICULTY
// ============================================================

changeDifficultyButton.addEventListener(
    "click",
    () => {

        clearInterval(timer);


        quizBox.classList.add(
            "hidden"
        );


        resultBox.classList.add(
            "hidden"
        );


        startBox.classList.remove(
            "hidden"
        );


        displayHighScore();

    }
);


// ============================================================
// INITIAL DISPLAY
// ============================================================

displayHighScore();