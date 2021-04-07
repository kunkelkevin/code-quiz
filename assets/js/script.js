var highScoreEl = document.querySelector("#high-score");
var pageEl = document.querySelector("main");
var questionNumber = 0;

var questions = [{
    question : "Common data types do not include:",
    answers : ["strings","booleans","alerts","numbers"],
    correctAnswer : 2
},{
    question : "In object-oriented programming, new classes can be defined by extending existing classes.  This is an example of:",
    answers : ["Encapsulation","Interface","Composition","Inheritance"],
    correctAnswer : 3
}]
// for (var i = 0; i < questions.length; i++){
//     questions.number = 
// }
var clearMain = function(){
    while(pageEl.firstChild){
        pageEl.removeChild(pageEl.firstChild);
    }
}
var displayQuestion = function(oneQuestion){
    clearMain();
    var targetEl = event.target;
    pageEl.className = "question-layout";
    console.log("started");
    var printedQuestion = document.createElement("h1");
    printedQuestion.className = "question";
    printedQuestion.textContent = oneQuestion.question;
    pageEl.appendChild(printedQuestion);

    
    for(i=0; i<oneQuestion.answers.length; i++){
        var answerButton = document.createElement("button");
      answerButton.className = "btn answer";
      answerButton.textContent = oneQuestion.answers[i];
      answerButton.setAttribute("data-answer-id",i)
      pageEl.appendChild(answerButton);
    }
    questionNumber++;
}

var clickDecision = function(event){
    console.log ("button clicked");
    var targetEl = event.target;
    if (targetEl.matches("#start")){
        displayQuestion(questions[questionNumber]);
    } else {
        var answerChosen = parseInt(targetEl.getAttribute("data-answer-id"));
    console.log(answerChosen,questions[questionNumber-1].correctAnswer)
        if (answerChosen === questions[questionNumber-1].correctAnswer){
        console.log("correct");
    }else {
        console.log("wrong");
    }
    if (questionNumber>=questions.length){
        clearMain();
        var closingStatement = document.createElement("h1");
        closingStatement.textContent = "The Quiz is over";
        pageEl.appendChild(closingStatement);
    } else if (targetEl.matches(".answer")){
    
    displayQuestion(questions[questionNumber]);
    }}
}
var highScore = function(event){
    clearMain();
    var highScoreTitle = document.createElement('h1');
    highScoreTitle.textContent = "High Scores";
    pageEl.appendChild(highScoreTitle);
}
  
pageEl.addEventListener('click',clickDecision);
highScoreEl.addEventListener('click',highScore);

