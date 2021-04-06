var startEl = document.querySelector("#start");
var page = document.querySelector("main");
var questions = [{
    question : "Common data types do not include:",
    answers : ["strings","booleans","alerts","numbers"],
    correctAnswer : 2
},{
    question : "In object-oriented programming, new classes can be defined by extending existing classes.  This is an example of:",
    answers : ["Encapsulation","Interface","Composition","Inheritance"],
    correctAnswer : 3
}]

var clearMain = function(){
    while(page.firstChild){
        page.removeChild(page.firstChild);
    }
}
var startQuiz = function(){
    clearMain();
    console.log("started");
    var printedQuestion = document.createElement("h1");
    printedQuestion.className = "question";
    printedQuestion.textContent = questions[0].question;
    page.appendChild(printedQuestion);

    
    for(i=0; i<questions[0].answers.length; i++){
        console.log(questions[0].answers[i]);
        var answerButton = document.createElement("button");
      answerButton.className = "btn";
      answerButton.textContent = questions[0].answers[i];
      page.appendChild(answerButton);
    }
}
    
startEl.addEventListener('click',startQuiz);
