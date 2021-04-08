var highScoreEl = document.querySelector("#high-score");
var pageEl = document.querySelector("main");
var timerEl = document.querySelector("#timer-count");
var questionNumber = 0;
var remainingTime = 10;
var numberCorrect = 0;
var counter = 0;

var questions = [
  {
    question: "Common data types do not include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: 2,
  },
  {
    question:
      "In object-oriented programming, new classes can be defined by extending existing classes.  This is an example of:",
    answers: ["Encapsulation", "Interface", "Composition", "Inheritance"],
    correctAnswer: 3,
  },
];
// for (var i = 0; i < questions.length; i++){
//     questions.number =
// }
var clearMain = function () {
  while (pageEl.firstChild) {
    pageEl.removeChild(pageEl.firstChild);
  }
};
var mainScreen = function () {
  clearMain();
  remainingTime = 60;
  questionNumber = 0;
  numberCorrect = 0;
  var maindisplay = document.createElement("div");
  pageEl.className = "main";
  maindisplay.innerHTML =
    '<h1>Coding Quiz Challenge</h1><p>Try to answer the following questions.</p><p>Once you begin, you will have 60 seconds to complete the quiz.</p><p>Wrong answers will deduct 10 seconds from you time.</p><p>Good Luck!!</p><button class="btn" id="start">Begin Quiz</button>';
  pageEl.appendChild(maindisplay);
};
var displayQuestion = function (oneQuestion) {
  clearMain();
  pageEl.className = "question-layout";
  console.log("started");
  var printedQuestion = document.createElement("h1");
  printedQuestion.className = "question";
  printedQuestion.textContent = oneQuestion.question;
  pageEl.appendChild(printedQuestion);

  for (i = 0; i < oneQuestion.answers.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.className = "btn answer";
    answerButton.textContent = oneQuestion.answers[i];
    answerButton.setAttribute("data-answer-id", i);
    pageEl.appendChild(answerButton);
  }
  questionNumber++;
};

var endScreen = function () {
  clearInterval(counter);
  remainingTime = Math.max(remainingTime, 0);
  console.log(remainingTime);
  timerEl.textContent = remainingTime;
  clearMain();
  var finalScore = 10 * numberCorrect + remainingTime;
  var closingTitle = document.createElement("div");
  closingTitle.innerHTML =
    "<h1>Finished</h1><p>Each correct answer was worth 10 points.  You had " +
    numberCorrect +
    " answer(s) correct and time bonus of " +
    remainingTime +
    ".</p><p>Your total score was " +
    finalScore +
    ".</p>";
  pageEl.appendChild(closingTitle);
  var mainButton = document.createElement("button");
  mainButton.className = "btn main-btn";
  mainButton.textContent = "Restart";
  pageEl.appendChild(mainButton);
};
var answeredCorrect = function () {
  numberCorrect++;
  console.log(numberCorrect);
};
var answeredWrong = function () {
  remainingTime -= 10;
};
var clickDecision = function (event) {
  console.log("button clicked");
  var targetEl = event.target;
  if (targetEl.matches("#start")) {
    displayQuestion(questions[questionNumber]);
    countDown();
  } else if (targetEl.matches(".main-btn")) {
    mainScreen();
  } else {
    var answerChosen = parseInt(targetEl.getAttribute("data-answer-id"));
    console.log(answerChosen, questions[questionNumber - 1].correctAnswer);
    if (answerChosen === questions[questionNumber - 1].correctAnswer) {
      answeredCorrect();
    } else {
      answeredWrong();
    }
    if (questionNumber >= questions.length) {
      endScreen(counter);
    } else if (targetEl.matches(".answer")) {
      displayQuestion(questions[questionNumber]);
    }
  }
};
var highScore = function (event) {
  clearMain();
  var highScoreTitle = document.createElement("h1");
  highScoreTitle.textContent = "High Scores";
  pageEl.appendChild(highScoreTitle);
};
var countDown = function () {
  counter = setInterval(function () {
    timerEl.textContent = remainingTime;
    remainingTime--;
    if (remainingTime < 0) {
      endScreen();
    }
  }, 1000);
};
mainScreen();
pageEl.addEventListener("click", clickDecision);
highScoreEl.addEventListener("click", highScore);
