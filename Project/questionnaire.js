// Load saved dark/light theme
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark") {
        document.body.classList.add("dark")
    } else if(savedTheme === "light") {
        document.body.classList.add("ligth")
    }
});


const questions = [
  {
    question: "What keyword is used to declare a constant variable in JavaScript?",
    answers: ["var", "let", "const", "static"],
    correct: 2
  },
  {
    question: "What does 'NaN' stand for in JavaScript?",
    answers: ["Not a Name", "No assigned Number", "Not a Number", "Null and Nothing"],
    correct: 2
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "/*", "<!--", "#"],
    correct: 0
  },
  {
    question: "What will `typeof []` return?",
    answers: ["array", "object", "list", "undefined"],
    correct: 1
  },
  {
    question: "What does `console.log()` do?",
    answers: [
      "Opens a log file",
      "Prints text to the console",
      "Creates a variable",
      "Runs your code twice"
    ],
    correct: 1
  },
  {
    question: "Which method adds an element to the end of an array?",
    answers: ["push()", "pop()", "shift()", "join()"],
    correct: 0
  }
];


let currentIndex = 0;
let score = 0;
let timeLeft = 10;
let timerId;


startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);



function startGame () {
  currentIndex = 0;
  score = 0;
  swapScreen(startScreen, questionScreen);
  showQuestion()
}


function showQuestion () {
  answerDiv.textContent = "";

  const currentQuestion = questions[currentIndex].question;
  const answerOptions = questions[currentIndex].answers;

  questionText.textContent = currentQuestion;

  answerOptions.forEach((answer, index) => {
    const answerBtn = document.createElement('button');
    answerBtn.textContent = answer;

    answerBtn.classList.add('answer-btn');
    answerBtn.setAttribute('data-index', index);

    answerBtn.addEventListener('click', handleAnswer);

    answerDiv.appendChild(answerBtn);
  })

  resetTimer();
}

function handleAnswer (event) {
  clearInterval(timerId);

  const selectedAnswerIndex = Number(event.target.dataset.index);
  const correctIndex = questions[currentIndex].correct;
  const answerButtons = Array.from(
    document.querySelectorAll('button.answer-btn')
  );

  const isCorrect = selectedAnswerIndex === correctIndex;

  answerButtons.forEach((button, index) => {
    if (index === correctIndex) {
      button.classList.add('correct')
    } else if (index === selectedAnswerIndex && !isCorrect) {
      button.classList.add('wrong')
    }
    button.disabled = true
  });

  //Increase score
  score += isCorrect ? 1 : 0;

  // Go to next question
  currentIndex++;

  setTimeout(() => {
    if (currentIndex < questions.length) {
      showQuestion()
    } else {
      showResults()
    }
  }, 1000);
}


function showResults () {
  swapScreen(questionScreen, resultScreen);

  finalScoreEl.textContent = `Your final score is: ${score}`;

  if(score === questions.length){
    resultMsgEl.textContent = "✨ Supreme Wizard of JavaScript! ✨";
  } else if (score >= (questions.length/2) && score < questions.length) {
    resultMsgEl.textContent = "🧙 Apprentice Mage – Keep Practicing!";
  } else {
    resultMsgEl.textContent = "💀 Novice – Study the ancient scrolls again!";
  };
}


function resetTimer() {
    timeLeft = 10;

    timerDisplay.textContent = `⏳ ${timeLeft}`;

    clearInterval(timerId);

    timerId = setInterval(() => {
        timeLeft-- ;
        timerDisplay.textContent = `⏳ ${timeLeft}`;

        if(timeLeft <= 0) {
            clearInterval(timerId)
            handleAnswer(
                { target:
                    { dataset:
                        { index: -1 }
                    }
                }
            );
        };

    }, 1000)
}


function swapScreen (hideEl, showEl) {
  const allScreens = document.querySelectorAll(".screen")

  allScreens.forEach((screen) => {
    screen.classList.remove("showing");
    screen.classList.add("hidden");
    screen.setAttribute("aria-hidden", true);
});

  showEl.classList.remove("hidden");
  showEl.classList.add("showing");
  showEl.setAttribute("aria-hidden", false);
}
