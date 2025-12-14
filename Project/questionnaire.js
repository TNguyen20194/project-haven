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
    question: "How often do you feel overwhelmed by your emotions?",
    answers: [
        "Rarely – I feel emotionally balanced most of the time",
        "Sometimes – Occasionally I struggle to manage my feelings",
        "Often – I frequently feel emotionally overwhelmed",
        "Almost always – My emotions feel out of control daily"
    ]
  },
  {
    question: "How would you describe your current sleep patterns?",
    answers: [
        "I sleep well and wake up feeling rested",
        "I have occasional trouble falling or staying asleep",
        "I frequently have sleep issues affecting my daily life",
        "I experience severe insomnia or sleep disturbances nightly"
    ]
  },
  {
    question: "How often do you experience feelings of anxiety or worry?",
    answers: [
        "Rarely – I generally feel calm and at ease",
        "Sometimes – I worry about specific situations occasionally",
        "Often – Anxiety affects my daily activities regularly",
        "Constantly – Persistent worry dominates my thoughts"
        ]
  },
  {
    question: "How would you describe your motivation and interest in daily activities?",
    answers: [
        "I feel motivated and enjoy my regular activities",
        "I sometimes lack motivation but can push through",
        "I often struggle to find interest or pleasure in activities",
        "I rarely feel motivated and have lost interest in most things"
    ]
  },
  {
    question: "How do you typically cope with stress?",
    answers: [
      "I have healthy coping mechanisms that work well for me",
      "I manage okay but sometimes resort to unhealthy habits",
      "I struggle to cope and often feel stuck",
      "I rely heavily on unhealthy coping mechanisms"
    ]
  },
  {
    question: "How would you rate your relationships with family and friends?",
    answers: [
        "Strong and supportive – I feel connected to others",
        "Generally good with occasional conflicts",
        "Strained – I often feel misunderstood or isolated",
        "Very difficult – Relationships cause significant distress"
    ]
  },
  {
    question: "Have you experienced any traumatic events that still affect you?",
    answers: [
        "No, or past events no longer impact my daily life",
        "Yes, but I manage the effects reasonably well",
        "Yes, and they occasionally interfere with my functioning",
        "Yes, and they significantly impact my daily life"
    ]
  },
  {
    question: "How often do you have negative thoughts about yourself?",
    answers: [
        "Rarely – I generally have a positive self-image",
        "Sometimes – I occasionally doubt myself",
        "Often – Negative self-talk is a regular occurrence",
        "Constantly – I struggle with persistent self-criticism"
    ]
  },
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
