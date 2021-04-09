var highScoreEl = document.querySelector("#high-score");
var pageEl = document.querySelector("main");
var timerEl = document.querySelector("#timer-count");
var showAnwserMatch = document.createElement("div");
showAnwserMatch.className = "answer-match";
var savedHighScores = [];
var questionOrder = [];
var questionNumber = 0;
var remainingTime = 10;
var numberCorrect = 0;
var counter = 0;
var finalScore = 0;
var answerMatch = "";

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
  {
    question:
      "Arrays in Javascript can be used to store __________.",
    answers: ["Numbers and Strings", "Other Arrays", "Booleen", "Objects", "All of the Above"],
    correctAnswer: 4,
  },
];
for (var i = 0; i < questions.length; i++){
    questionOrder[i] = i;
}



var clearMain = function () {
  while (pageEl.firstChild) {
    pageEl.removeChild(pageEl.firstChild);
  }
};

var randomizer = function(arr){
    for (var i = 0; i<arr.length; i++){
        var temp = arr[i];
        var a = Math.floor(Math.random()*arr.length);
        arr[i] = arr[a];
        arr[a] = temp;
    }
    return arr;
}
var mainScreen = function () {
  clearMain();
  remainingTime = 60;
  questionNumber = 0;
  numberCorrect = 0;
  answerMatch = "";
  questionOrder = randomizer(questionOrder);
  var maindisplay = document.createElement("div");
  pageEl.className = "main";
  maindisplay.innerHTML =
    '<h1>Coding Quiz Challenge</h1><p>Try to answer the following questions.</p><p>Once you begin, you will have 60 seconds to complete the quiz.</p><p>Wrong answers will deduct 10 seconds from you time.</p><p>Good Luck!!</p><button class="btn" id="start">Begin Quiz</button>';
  pageEl.appendChild(maindisplay);
};

var displayQuestion = function (oneQuestion) {
  clearMain();
  pageEl.className = "question-layout";
  var printedQuestion = document.createElement("h1");
  printedQuestion.className = "question";
  printedQuestion.textContent = oneQuestion.question;
  pageEl.appendChild(printedQuestion);

  var answerOrder = [];
  for (var i = 0; i < oneQuestion.answers.length; i++){
    answerOrder[i] = i;
  }
  answerOrder = randomizer(answerOrder);
  for (var i = 0; i < oneQuestion.answers.length; i++){
    if (oneQuestion.answers[answerOrder[i]].toLowerCase()==="all of the above"){
        console.log(oneQuestion.answers[answerOrder[i]]);
        console.log(answerOrder,i);
        console.log(oneQuestion.answers[oneQuestion.answers.length-1]);
        var temp = answerOrder[i];
        answerOrder[i] = answerOrder[answerOrder.length-1];
        answerOrder[answerOrder.length-1] = temp;
      break;
    }
  }
  
  for (i = 0; i < oneQuestion.answers.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.className = "btn answer";
    answerButton.textContent = oneQuestion.answers[answerOrder[i]];
    answerButton.setAttribute("data-answer-id", answerOrder[i]);
    pageEl.appendChild(answerButton);
  }
  if (!(answerMatch==="")){
      
      showAnwserMatch.textContent = answerMatch;
      pageEl.appendChild(showAnwserMatch);
  }
  questionNumber++;
};

var endScreen = function () {
  clearInterval(counter);
  loadScores();
  remainingTime = Math.max(remainingTime, 0);
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
    var mainButton = document.createElement("button");
  mainButton.className = "btn main-btn";
  mainButton.textContent = "Restart";
  pageEl.appendChild(mainButton);
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
  showAnwserMatch.textContent = answerMatch;
  pageEl.appendChild(showAnwserMatch);
  
};

var answeredCorrect = function () {
  numberCorrect++;
  var correctSound = new Audio("./assets/mp3/correct-answer.mp3");
  correctSound.play();
  answerMatch = "Correct!";
};

var answeredWrong = function () {
  remainingTime -= 10;
  var wrongSound = new Audio("./assets/mp3/wrong-answer.mp3");
  wrongSound.play();
  answerMatch = "Wrong!";
};

var loadScores = function () {
  var savedScore = localStorage.getItem("scores");
  if (!savedScore) {
    return false;
  }
  savedHighScores = JSON.parse(savedScore);
};

var clickDecision = function (event) {
  var targetEl = event.target;
  if (targetEl.matches("#start")) {
    displayQuestion(questions[questionOrder[questionNumber]]);
    countDown();
  } else if (targetEl.matches(".main-btn")) {
    mainScreen();
  } else if (targetEl.matches(".answer")) {
    var answerChosen = parseInt(targetEl.getAttribute("data-answer-id"));
    if (answerChosen === questions[questionOrder[questionNumber-1]].correctAnswer) {
      answeredCorrect();
    } else {
      answeredWrong();
    }
    if (questionNumber >= questions.length) {
      endScreen();
    } else {
      displayQuestion(questions[questionOrder[questionNumber]]);
    }
  } else if (targetEl.matches("#submit-btn")) {
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
  } else if (targetEl.matches(".reset")){
      localStorage.clear();
      savedHighScores = "";
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
  var buttonsEl = document.createElement("div");
  buttonsEl.className = "hs-buttons";
  var mainButton = document.createElement("button");
  mainButton.className = "btn main-btn";
  mainButton.textContent = "Return Home";
  buttonsEl.appendChild(mainButton);
  var resetButton = document.createElement("button");
  resetButton.className = "btn reset";
  resetButton.textContent = "Clear High Scores";
  buttonsEl.appendChild(resetButton);
  pageEl.appendChild(buttonsEl);
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
