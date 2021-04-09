# Code Quiz

Created a code quiz dynamically generated through javascripts.  Each time a button is selected, the page will be cleared and next page will be presented.  A persistant header stays at the top with a link to the highscores and a timer.

The page will automatically load a start screen that explains the quiz with a button to start the quiz.  Once started the timer in the header will begin to countdown starting at 60.  The questions are sorted randomly each time and you will then be presented with the first question from the random list of 10 questions.  Each time a question is answered the next question will be presented until all 10 questions are answered or the timer reaches 0.  If a question is answered correctly, a chime sounds and the next screen will notify you that it is correct.  If it is answered incorrectly, 10 seconds will be deducted from the timer, a buzzer will sound, and the next screen will notify you that it was wrong.  In addition to questions be sorted randomly, the answered are also displayed in a random order with a check to make sure an answer of "All of the above" is located in the last spot.

Once the quiz is completed your score is calculated by adding 10 points for each correct answer and 1 point for each remaining second on the timer.  The final screen will load and compare your score to the highscore list stored on local storage.  If your score is high enough to be in the top 5, a form will be present that will allow you to enter your initials (max 3 characters, user is allowed to leave blank) to submit your highscore; otherwise text will change and a button to return to main screen will appear.  

Once initials are entered or any time the highscore link is clicked from the header, the highscore screen will appear displaying up to 5 scores and sorted highest to lowest.  Buttons appear at the bottom to either return to the main screen or reset the highscores.

The website is [https://kunkelkevin.github.io/code-quiz/](https://kunkelkevin.github.io/codequiz/)

Screenshot showing the initial/main screen
![Main screenshot](/assets/img/screenshot-main.png "Main Screen")

Screenshot showing one of the questions
![Question screenshot](/assets/img/screenshot-question.png "Question Screen")

Screenshot showing the final screen when scoring high enough to enter highscore
![Final screenshot](/assets/img/screenshot-final.png "Final Screen")

Screenshot showing the Highscore screen
![Highscore screenshot](/assets/img/screenshot-highscore.png "Highscore Screen")
