let quizs = [
   {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d",
   },
   {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b",
   },
   {
      question: "What does HTML stand for?",
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborghinis",
      correct: "a",
   },
   {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "None of the above",
      correct: "b",
   },
];

let meinQuiz = document.getElementById('quiz');
let answerEls = document.querySelectorAll('.answer');
let questionh1 = document.getElementById('h1');
let a_text = document.getElementById('a_text');
let b_text = document.getElementById('b_text');
let c_text = document.getElementById('c_text');
let d_text = document.getElementById('d_text');
let subbmit = document.getElementById('subbmit');
let timerEl = document.getElementById('time'); // Timer element

let currentQuiz = 0;
let score = 0;
let timeLeft = 10; // Initial time for each question
let timerInterval;

// Load the initial quiz question
loadQuiz();

function loadQuiz() {
   deselectAnswers();
   let currentQuizData = quizs[currentQuiz];
   questionh1.innerText = currentQuizData.question;
   a_text.innerText = currentQuizData.a;
   b_text.innerText = currentQuizData.b;
   c_text.innerText = currentQuizData.c;
   d_text.innerText = currentQuizData.d;

   resetTimer();
   startTimer();
}

function deselectAnswers() {
   answerEls.forEach((answerEl) => {
      answerEl.checked = false;
   });
}

function getSelected() {
   let selectedAnswer;
   answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
         selectedAnswer = answerEl.id; // Get the id of the selected answer
      }
   });
   return selectedAnswer;
}

subbmit.addEventListener('click', () => {
   handleAnswer();
});

function handleAnswer() {
   let selectedAnswer = getSelected();
   
   if (selectedAnswer) {
      if (selectedAnswer === quizs[currentQuiz].correct) {
         score++;
      }
      moveToNextQuestion();
   }
}

function moveToNextQuestion() {
   currentQuiz++;
   clearInterval(timerInterval); // Stop the timer for the current question
   
   if (currentQuiz < quizs.length) {
      loadQuiz();
   } else {
      endQuiz();
   }
}

function startTimer() {
   timeLeft = 10; // Set time for each question
   timerEl.innerText = timeLeft;

   timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;

      if (timeLeft <= 0) {
         clearInterval(timerInterval);
         moveToNextQuestion(); // Automatically move to next question if time runs out
      }
   }, 1000);
}

function resetTimer() {
   clearInterval(timerInterval); // Clear the previous interval
   timeLeft = 10; // Reset time for the new question
}

function endQuiz() {
   meinQuiz.innerHTML = `
      <h2>Your score is ${score}/${quizs.length} correct answers</h2>
      <button id="reload">Reload</button>
   `;

   const reloadBtn = document.getElementById('reload');
   reloadBtn.addEventListener('click', () => {
      location.reload(); // Reload the page
   });
}
