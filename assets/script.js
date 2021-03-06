var question = document.querySelector("#question");
var option1 = document.querySelector("#optionOne");
var option2 = document.querySelector("#optionTwo");
var option3 = document.querySelector("#optionThree");
var option4 = document.querySelector("#optionFour");
// var localStorageName = "theVeryBest";
// var highScore;
var quizPosition;
var quizStarted = false;
var quizOver;

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

// highScore = localStorage.getItem(localStorageName) == null ? 0 :
//             localStorage.getItem(localStorageName);

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

// document.getElementById("app").innerHTML = '...'

function formatTime(time) {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

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

option3.addEventListener("click", function(event){
    if (quizOver === true) {
        return;
    }
    else if (quizStarted === false){
        alert("Look at the current highscores!");
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

function fight() 
{
    quizPosition = 0;
    quizStarted = true;
    battleRound();
    startTimer();
};

function timePenalty() {
    timePassed = timePassed += 3
}

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

function battleRound ()
{
    question.textContent = questions [quizPosition][0];
    option1.textContent = questions [quizPosition][1];
    option2.textContent = questions [quizPosition][2];
    option3.textContent = questions [quizPosition][3];
    option4.textContent = questions [quizPosition][4];

};
