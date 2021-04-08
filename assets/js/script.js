var highScoreEl = document.querySelector("#high-score");
var pageEl = document.querySelector("main");
var timerEl = document.querySelector("#timer-count");
var savedHighScores = [];
var questionNumber = 0;
var remainingTime = 10;
var numberCorrect = 0;
var counter = 0;
var finalScore = 0;

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
var sortScores = function () {};

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
  loadScores();
  remainingTime = Math.max(remainingTime, 0);
  console.log(remainingTime);
  timerEl.textContent = remainingTime;
  clearMain();
  finalScore = 10 * numberCorrect + remainingTime;
  var closingTitle = document.createElement("div");
  closingTitle.innerHTML =
    "<h1>Finished</h1><p>Each correct answer was worth 10 points.  You had " +
    numberCorrect +
    " answer(s) correct and time bonus of " +
    remainingTime +
    ".</p><p>Your total score was " +
    finalScore +
    ".</p>";
  if (
    savedHighScores.length >= 5 &&
    finalScore <= savedHighScores[savedHighScores.length - 1].score
  ) {
    closingTitle.innerHTML =
      closingTitle.innerHTML +
      "<p> Sorry, you needed a score of over " +
      savedHighScores[savedHighScores.length - 1].score +
      " to make it to the highscore list </p>";
    pageEl.appendChild(closingTitle);
  } else {
    closingTitle.innerHTML =
      closingTitle.innerHTML +
      "<p> Please enter your initials for the highscore</p>";
    pageEl.appendChild(closingTitle);
    var highScoreForm = document.createElement("form");
    var highScoreInput = document.createElement("div");
    var highScoreSubmit = document.createElement("div");
    highScoreInput.innerHTML =
      "<input type='text' name='initials' maxlength = '3' placeholder='Enter your initials'/>";
    highScoreForm.appendChild(highScoreInput);
    highScoreSubmit.innerHTML =
      "<button class='btn' id='submit-btn' type='submit'>Submit</button>";
    highScoreForm.appendChild(highScoreSubmit);
    pageEl.appendChild(highScoreForm);
  }
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

var loadScores = function () {
  var savedScore = localStorage.getItem("scores");
  if (!savedScore) {
    return false;
  }
  savedHighScores = JSON.parse(savedScore);
};

var clickDecision = function (event) {
  console.log("button clicked");
  var targetEl = event.target;
  if (targetEl.matches("#start")) {
    displayQuestion(questions[questionNumber]);
    countDown();
  } else if (targetEl.matches(".main-btn")) {
    mainScreen();
  } else if (targetEl.matches(".answer")) {
    var answerChosen = parseInt(targetEl.getAttribute("data-answer-id"));
    console.log(answerChosen, questions[questionNumber - 1].correctAnswer);
    if (answerChosen === questions[questionNumber - 1].correctAnswer) {
      answeredCorrect();
    } else {
      answeredWrong();
    }
    if (questionNumber >= questions.length) {
      endScreen(counter);
    } else {
      displayQuestion(questions[questionNumber]);
    }
  } else if (targetEl.matches("#submit-btn")) {
    console.log(document.querySelector("input[name='initials']").value);
    var highScoreObj = {
      name: document.querySelector("input[name='initials']").value,
      score: finalScore,
    };
    loadScores();
    savedHighScores.splice(4, 1, highScoreObj);
    savedHighScores.sort(function (a, b) {
      return b.score - a.score;
    });
    localStorage.setItem("scores", JSON.stringify(savedHighScores));
    highScore();
  }
};

var highScore = function (event) {
  clearMain();
  loadScores();
  clearInterval(counter);
  pageEl.className = "main";
  var highScoreTitle = document.createElement("h1");
  highScoreTitle.textContent = "High Scores";
  pageEl.appendChild(highScoreTitle);
  for (i = 0; i < savedHighScores.length; i++) {
    var scoreList = document.createElement("div");
    var scoreListInitials = document.createElement("p");
    var scoreListScore = document.createElement("p");
    scoreList.className = "high-score-list";
    scoreListInitials.className = "high-score-name";
    scoreListScore.className = "high-score-score";
    scoreListInitials.textContent = savedHighScores[i].name;
    scoreListScore.textContent = savedHighScores[i].score;
    scoreList.appendChild(scoreListInitials);
    scoreList.appendChild(scoreListScore);
    pageEl.appendChild(scoreList);
  }
  var mainButton = document.createElement("button");
  mainButton.className = "btn main-btn";
  mainButton.textContent = "Return Home";
  pageEl.appendChild(mainButton);
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
