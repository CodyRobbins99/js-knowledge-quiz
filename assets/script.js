// Dom Elements
var timerEl = document.getElementById('timer');
var startBtn = document.getElementById('start-btn');
var startContainerEl = document.getElementById('start-container')
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var topContentEl = document.getElementById('top-content');
var answerButtonsEl = document.getElementById('answer-buttons');
var scoreScreen = document.getElementById('end-quiz');
var userFinalScore = document.getElementById('final-score');
var userScores = JSON.parse(localStorage.getItem("userScores")) || [];
var userScoresList = document.getElementById('userScoresList');
var goHomeButton =  document.getElementById('go-home-btn');
var submitInitialsButton = document.getElementById('submit-initials');
var highScoresButtonEl = document.getElementById('button-div')
var highScoresScreen = document.getElementById('user-scores-section');
var msgDiv = document.querySelector("#msg");
var score, initials
var timeLeft = '';

// Quiz Score Variable
var quizScore = 0;

// Shuffled Questions and Current Question Index Variables
var shuffledQuestions, currentQuestionIndex

// Questions Array
const questionsArray = [
    {
        question:'Which HTML element do we use to link our JavaScript files?',
        answers: [
            { text: '1. <js>', correct: false},
            { text: '2. <javascript>', correct: false},
            { text: '3. <script>', correct: true},
            { text: '4. <scripting>', correct: false}
        ]
    },
    {
        question:'Which of the following is true about the typeof operator in JavaScript',
        answers: [
            { text: '1. The typeof is a unary operator that is placed before its single operand, which can be of any type.', correct: false},
            { text: '2. Its value is a string indicating the data type of the operand.', correct: false},
            { text: '3. Both of the above.', correct: true},
            { text: '4. None of the above.', correct: false}
        ]
    },
    {
        question:'Which of the following is true about cookie handling in JavaScript?',
        answers: [
            { text: '1. JavaScript can manipulate cookies using the cookie property of the Document object.', correct: false},
            { text: '2. JavaScript can read, create, modify, and delete the cookie or cookies that apply to the current web page.', correct: false},
            { text: '3. None of the above.', correct: false},
            { text: '4. Both of the above.', correct: true}
        ]
    },
    {
        question:'Which built-in method removes the last element from an array and returns that element?',
        answers: [
            { text: '1. pop()', correct: true},
            { text: '2. get()', correct: false},
            { text: '3. last()', correct: false},
            { text: '4. None of the above.', correct: false}
        ]
    },
    {
        question:'Which of the following functions of an Array object calls a function for each element in the array?',
        answers: [
            { text: '1. concat()', correct: false},
            { text: '2. forEach()', correct: true},
            { text: '3. filter()', correct: false},
            { text: '4. every()', correct: false}
        ]
    },
    {
        question:'Which of the following functions of an Array object adds one or more elements to the front of an array and returns the new length of the array?',
        answers: [
            { text: '1. unshift()', correct: true},
            { text: '2. sort()', correct: false},
            { text: '3. splice()', correct: false},
            { text: '4. toString()', correct: false}
        ]
    },
    {
        question:'What does the DOM stand for?',
        answers: [
            { text: '1. Data Object Model', correct: false},
            { text: '2. Data Only Model', correct: false},
            { text: '3. Document Object Model', correct: true},
            { text: '4. Document Object Memo', correct: false}
        ]
    },
    {
        question:'Which of the following options is NOT an acceptable replacement for "var"?',
        answers: [
            { text: '1. "let"', correct: false},
            { text: '2. "const"', correct: false},
            { text: '3. "variable"', correct: true},
            { text: '4. None of the above.', correct: false}
        ]
    },
    {
        question:'Which of the following is the correct syntax to display “JavaScript” in an alert box using JavaScript?',
        answers: [
            { text: '1. alertbox("JavaScript")', correct: false},
            { text: '2. alertuser("JavaScript")', correct: false},
            { text: '3. msgbox("JavaScript")', correct: false},
            { text: '4. alert("JavaScript")', correct: true}
        ]
    },
    {
        question:'What is the result of: Number("1") - 1 == 0;',
        answers: [
            { text: '1. True', correct: true},
            { text: '2. False', correct: false},
            { text: '3. Syntax Error', correct: false},
            { text: '4. None of the above.', correct: false}
        ]
    }
];

// Start Game Function
function StartGame() {
    quizScore = 0;
    countdown();
    startBtn.classList.add('hidden');
    startContainerEl.classList.add('hidden');
    highScoresButtonEl.classList.add('hidden');
    shuffledQuestions = questionsArray.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hidden');
    setNextQuestion();
};

// Set Next Question Function
function setNextQuestion() {
    if (currentQuestionIndex < questionsArray.length) {
        if (timeLeft <= 0) {
            alert("You're out of time! Press 'OK' to see how you did!")
            callScoreScreen();
        }
        else {
            resetQuestionState();
            showQuestion(shuffledQuestions[currentQuestionIndex])
        }
    }
    else {
        alert("You've answered all of the questions! Press 'OK' to see how you did!")
        callScoreScreen();
    }
};

// Reset Question State Function
function resetQuestionState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
};

// Show Question Function
function showQuestion(question) {
    questionEl.innerText = question.question

    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

// Select an Answer Function
function selectAnswer(e) {
    var selectedAnswer = e.target
    var correct = selectedAnswer.dataset.correct;
    
    if (!correct) {
        selectedAnswer.className+= "btn btn-incorrect"
        if ( quizScore >= 5) {
            timeLeft = timeLeft - 5;
            quizScore = quizScore - 5;
            currentQuestionIndex++
            setTimeout(setNextQuestion, 1000)
        }
        else if ( quizScore < 5) {
            timeLeft = timeLeft - 5;
            quizScore = 0;
            currentQuestionIndex++
            setTimeout(setNextQuestion, 1000)
        }
    }
    else {
        selectedAnswer.className+= "btn btn-correct"
        quizScore = quizScore + 5;
        currentQuestionIndex++
        setTimeout(setNextQuestion, 1000)
    }
};

// Timer Function
function countdown() {
    // A variable for the time set to 90
    timeLeft = 90;

    var timeInterval = setInterval(function() {
        if (currentQuestionIndex < questionsArray.length){
            if (timeLeft > 1) {
                timerEl.textContent = 'Time: ' + timeLeft;
                timeLeft--;
            }
            else if (timeLeft === 1) {
                timerEl.textContent = 'Time: ' + timeLeft;
                timeLeft--;
            }
            else {
                timerEl.textContent = '';
                clearInterval(timeInterval);
            }
        }
        else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
};

// Score Screen Function
function callScoreScreen() {
    userFinalScore.innerText = quizScore;
    questionContainerEl.classList.add('hidden');
    scoreScreen.classList.remove('hidden');
};

// High Score Screen Function 
function callHighScores() {
    scoreScreen.classList.add('hidden');
    highScoresButtonEl.classList.add('hidden');
    startBtn.classList.add('hidden');
    startContainerEl.classList.add('hidden')
    highScoresScreen.classList.remove('hidden')

    var scoreCount = 0;
    userScoresList.innerHTML = userScores.map(score => {
       scoreCount++;
        return `<li class="high-score">${scoreCount}. ${score.initials} - ${score.score}</li>`
    }).join("");
}

//  Home Screen Function 
function callGoHome() {
    highScoresButtonEl.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    startContainerEl.classList.remove('hidden')
    highScoresScreen.classList.add('hidden')
}
// Initials Error Message Function
function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
};

// Event Listeners
startBtn.onclick = StartGame;
highScoresButtonEl.onclick = callHighScores;
goHomeButton.onclick = callGoHome;
submitInitialsButton.onclick = function (event) {
    event.preventDefault();

    initials = document.querySelector("#initials").value
    score = {
        score: quizScore,
        initials: initials,
    }
    if ( initials === '') {
        displayMessage("error", "Initials cannot be left blank")
    }
    else if ( initials.length > 2 ) {
        displayMessage("error", "Please limit initials to 2 characters.")
    }
    else {
        userScores.push(score);
        userScores.sort((a,b) => b.score - a.score);
        userScores.splice(5);

        localStorage.setItem("userScores", JSON.stringify(userScores));
        callHighScores();
    }
};