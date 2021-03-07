// First 5 variables are hooking variables to specific sections of the html base on matching IDs
var question = document.querySelector("#question");
var option1 = document.querySelector("#optionOne");
var option2 = document.querySelector("#optionTwo");
var option3 = document.querySelector("#optionThree");
var option4 = document.querySelector("#optionFour");
// This pulls out the high score string from local storage and turns it back into an array
var theVeryBest = JSON.parse(localStorage.getItem('hallOfFame')) || [];
// These are mostly logical variables that I reuse to pass through if statments throughout the document to tell it which code to execute
var highScore;
var quizPosition;
var quizStarted = false;
var quizOver;
// This var I'm quite proud of. It stores an array of all the questions at specific indexes within that array. The final index is the correct answer. It could probably be cleaned up with keys to make it more readable for someone other than me. 
var questions = [
    ["Inside which HTML element do we put the JavaScript?", "<js>", "<javascript>", "<scripting>", "<script>", 4],
    ["How do you write 'hello world' in an alert box?", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", 1],
    ["How do you write an IF statement in Javascript", "if (i==5)", "if i=5", "if i=5 then", "if i==5 then", 1],
    ["How do you write an IF statement for executing some code if 'i' is not equal to 5?", "if (i !=5)", "if i=! 5 then", "if i <> 5", "if (i<>5)", 1],
    ["How does a WHILE loop start?", "while (i <= 10, i++)", "while (i <= 10)", "while i = 1 to 10", "while <10 ++", 2],
    ["What is the correct way to write a JavaScript array?", "var colors = 'red', 'green'", "var colors (1:'red', 2:'green')", "var colors = 1 ('red'), 2 ('green')", "var colors = ['red', 'green']", 4],
    ["How do you round the number 7.25, to the nearest integer?", "Math.rnd(7.25)", "rnd(7.25)", "round(7.25)", "Math.round(7.25)", 4],
    ["How do you find the number with the highest value of x and y?", "Math.ceil(x,y)", "ceil (x,y)", "Math.Max (x,y)", "top(x,y)", 3],
    ["Which event occurs when the user clics on an HTML element?", "onchange", "onclick", "onmouseclick", "onmouseover", 2],
    ["Which operator is used to assign a value to a variable?", "=", "*", "-", "x", 1]
]

// Where I adapted this wonderful countdown code from https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 30;
const ALERT_THRESHOLD = 10;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const timeLimit = 60;
let timePassed = 0;
let timeLeft = 60;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="https://www.w3.org/TR/SVG2/">
    <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}
    </span>
</div>
`;

function formatTime(time) {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}
// This starts the timer and tells it to run the code every second on the page. While also updating the current position on the timer circle and what color it should be.
function startTimer() {
    timerInterval = setInterval((countdown) => {
        timePassed = timePassed += 1;
        timeLeft = timeLimit - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    if (timeLeft <= 0) {
        timesUp();
    }
    }, 1000);


}
// Based on what time is remaining this cycles through CSS properties so the color changes as the timer runs out.
function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
// Witchcraft which makes the timer work better
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / timeLimit;
    return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}
  
function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
}
/* This I'm quite happy with. It is a generic click function that adapts to the current webpage state. If the game is over then it turns off the interaction (or responds by doing nothing might be more accurate).
Next it checks if the quiz has been started yet and if it hasn't then it will start the quiz in the case of the first option.
Then we have a new if statment that checks if the option chosen matches the answer index which advances to the next question.
Else it changes the text to incorrect and subtracts 3 from the timer. It does keep applying the time penalty if they keep clicking incorrect.
Maybe don't do that?*/
option1.addEventListener("click", function(event){
    if (quizOver === true) {
        return;
    }
    else if (quizStarted === false){
        fight();
    }
    else {
        if (questions [quizPosition][5] === 1) { 
            quizPosition ++;
            battleRound();
        }
        else {
            option1.textContent = "Incorrect!";
            timePenalty();
        }
    }
});
// Similar but it gives a quick explanation if the quiz hasn't started
option2.addEventListener("click", function(event){
    if (quizOver === true) {
        return;
    }
    else if (quizStarted === false){
        alert("Click the answer button to start the quiz! Each incorrect answer costs you 3 seconds. Can you answer 10 questions in 60 seconds?");
    }
    else {
        if (questions [quizPosition][5] === 2) { 
            quizPosition ++;
            battleRound();
        }
        else {
            option2.textContent = "Incorrect!";
            timePenalty();
        }
    }
});
// More of the same but it will pull up the highscore logic if the quiz has not started
option3.addEventListener("click", function(event){
    if (quizOver === true) {
        return;
    }
    else if (quizStarted === false){
        theBestAround();
    }
    else {
        if (questions [quizPosition][5] === 3) { 
            quizPosition ++;
            battleRound();
        }
        else {
            option3.textContent = "Incorrect!";
            timePenalty();
        }
    }
});
// This is just for my amusement and to drive home the pokemon analogy
option4.addEventListener("click", function(event){
    if (quizOver === true) {
        return;
    }
    else if (quizStarted === false){
        alert("You can't run away!");
    }
    else {
        if (questions [quizPosition][5] === 4) { 
            quizPosition ++;
            battleRound();
        }
        else {
            option4.textContent = "Incorrect!";
            timePenalty();
        }
    }
});
// This function starts the quiz and ensures that the website is at the right question index, knows that the in quiz logic should execute, asks the first question and then starts the timer.
function fight() 
{
    quizPosition = 0;
    quizStarted = true;
    battleRound();
    startTimer();
};
/* Any incorrect selections during the quiz run this method which increments timePassed by 3 in addition to the regular increment every second.
I am aware of the fact that this probably ends up eating seconds depending on when this is run in comparison to the regular interval incrementation
¯\_(ツ)_/¯ */
function timePenalty() {
    timePassed = timePassed += 3
}
// Most importantly for my sanity it stops the interval from running and sets the time left to 0 so you "theoretically" can't get it to stick on displaying a negative time value
function timesUp() {
    timeLeft = 0;
    clearInterval(timerInterval);
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    quizOver = true;
    option1.textContent = "You were defeated by coding quiz!"
    option2.textContent = "Wrong answers cost you 3 seconds"
    option3.textContent = "You can do this!"
    option4.textContent = "Reload the page to try again!"
}
/* This is one of my work horse functions. It most relevantly handles updating all the text content with the current question and answers.
I also gave it the bonus purpose of handling the end of the quiz functions. Because there is nothing declared after the 
final array with questions and answers it defaults to null and we can use this defaut behavior to tell the quiz that the quiz is over.
It also prompts the user to enter their name and appends that to the high score array with the completion time and then turn that into 
a string in local storage. One fun thing is that I just copied quizOver = true from my fail state on a whim without a real purpose.
Only to realize that it also succeds in turning off the quiz logic until reloaded. So go accidental competency!
*/
function battleRound (){
if (questions [quizPosition] == null){
    clearInterval(timerInterval);
    quizOver = true;
    var aWinner = prompt("Enter your name, please:")
    theVeryBest += [aWinner, timeLeft];
    alert("Your best time has been stored. Refresh to try and beat it!")
    localStorage.setItem('hallOfFame', JSON.stringify(theVeryBest));
}
else {
    question.textContent = questions [quizPosition][0];
    option1.textContent = questions [quizPosition][1];
    option2.textContent = questions [quizPosition][2];
    option3.textContent = questions [quizPosition][3];
    option4.textContent = questions [quizPosition][4];

}
};
// The end! This explains the function of the 3rd button if there are no high scores. And displays the high scores if there are any. It doesn't organize them ¯\_(ツ)_/¯ but that is a problem for future Kelvin
function theBestAround () {
    if (theVeryBest == 0){
        alert("This is where the best times go!");
    }
    else {
        alert(theVeryBest);
    } 
}