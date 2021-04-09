// Initilize variables
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


// array of all question objects.  correctAnswer is the index value of the correct answer.
var questions = [
  {
    question: "Common data types do not include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: 2,
  },
  {
    question:
      "What kind of statement is used to execute actions base on a trigger or condition",
    answers: ["Conditional Statement", "Fired Event", "Boolean Variable", "Regular Expression", "For Loop"],
    correctAnswer: 0,
  },
  {
    question:
      "Arrays in Javascript can be used to store __________.",
    answers: ["Numbers and Strings", "Other Arrays", "Booleen", "Objects", "All of the Above"],
    correctAnswer: 4,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: 3,
  },
  {
    question:
      "String values must be enclosed within _________ when being assigned to variables.",
    answers: ["commas", "Curly brackets", "quotes", "parenthesis"],
    correctAnswer: 2,
  },
  {
    question:
      "The condition in an if/else statement is enclosed with __________",
    answers: ["quotes", "curly brackets", "square brackets", "parenthesis"],
    correctAnswer: 3,
  },
  {
    question:
      "What tag is used to define a standard cell inside a table?",
    answers: ["<td>", "<h1> to <h6>", "<footer>", "<button>"],
    correctAnswer: 0,
  },
  {
    question:
      "What is a JavaScript element that represents either TRUE of FALSE values?",
    answers: ["RegExp", "Event", "Boolean", "Condition"],
    correctAnswer: 2,
  },
  {
    question:
      "In JavaScript, what is a block of code called that is used to perform a specific task?",
    answers: ["Function", "Variable", "Declaration", "String"],
    correctAnswer: 0,
  },
  {
    question:
      "What is the name of the statment that is used to exit or end a loop?",
    answers: ["Break statment", "Falter statment", "Conditional statement", "Close statement"],
    correctAnswer: 0,
  },
];
for (var i = 0; i < questions.length; i++){
    questionOrder[i] = i;
}

// Clears the screen for a change pages
var clearMain = function () {
  while (pageEl.firstChild) {
    pageEl.removeChild(pageEl.firstChild);
  }
};

// Sends back the array in a random order, used for both question and answer order.
var randomizer = function(arr){
    for (var i = 0; i<arr.length; i++){
        var temp = arr[i];
        var a = Math.floor(Math.random()*arr.length);
        arr[i] = arr[a];
        arr[a] = temp;
    }
    return arr;
}

// Creates html for the starting screen
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

// Creates page for each question
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
  // Check to see if "All of the Above" is in the answer list and move to last answer spot
  for (var i = 0; i < oneQuestion.answers.length; i++){
    if (oneQuestion.answers[answerOrder[i]].toLowerCase()==="all of the above"){
        var temp = answerOrder[i];
        answerOrder[i] = answerOrder[answerOrder.length-1];
        answerOrder[answerOrder.length-1] = temp;
      break;
    }
  }
  
  for (i = 0; i < oneQuestion.answers.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.className = "btn answer";
    answerButton.textContent = (i+1) + ")  " + oneQuestion.answers[answerOrder[i]];
    answerButton.setAttribute("data-answer-id", answerOrder[i]);
    pageEl.appendChild(answerButton);
  }
  // Show if answer from previous question is right or wrong
  if (!(answerMatch==="")){
      showAnwserMatch.textContent = answerMatch;
      pageEl.appendChild(showAnwserMatch);
  }
  questionNumber++;
};

// Final screen after quiz is complete and shows final score and possible high score input.
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
    //Check to see if score qualifies for top 5 in high score list.
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

// Response to correct answer
var answeredCorrect = function () {
  numberCorrect++;
  var correctSound = new Audio("./assets/mp3/correct-answer.mp3");
  correctSound.play();
  answerMatch = "Correct!";
};

// Response to wrong answer
var answeredWrong = function () {
  remainingTime -= 10;
  var wrongSound = new Audio("./assets/mp3/wrong-answer.mp3");
  wrongSound.play();
  answerMatch = "Wrong!";
};

// Retrieves highscores from local storage and saves to array
var loadScores = function () {
  var savedScore = localStorage.getItem("scores");
  if (!savedScore) {
    return false;
  }
  savedHighScores = JSON.parse(savedScore);
};

// Decision tree for clicks on the main page including start button, answer button (right/wrong), return home and highscore submit
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
      savedHighScores = [];
      highScore();
  }
};

//Displays highscore screen
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

// Sets timer and sends to final screen if time runs out
var countDown = function () {
  counter = setInterval(function () {
    timerEl.textContent = remainingTime;
    remainingTime--;
    if (remainingTime < 0) {
      endScreen();
    }
  }, 1000);
};

// Brings up the initial screen
mainScreen();
// Event listener for any click within main
pageEl.addEventListener("click", clickDecision);
// Event listener for click to highscores in the header
highScoreEl.addEventListener("click", highScore);
