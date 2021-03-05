var question = document.querySelector("#question");
var option1 = document.querySelector("#optionOne");
var option2 = document.querySelector("#optionTwo");
var option3 = document.querySelector("#optionThree");
var option4 = document.querySelector("#optionFour");

var quizPosition;
var quizStarted = false;

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

option1.addEventListener("click", function(event){
    if (quizStarted === false){
        fight();
    }
    else {
        if (questions [quizPosition][5] === 1) { 
            console.log ("Correct");
            quizPosition ++;
            battleRound();
        }
        else {
            console.log ("Wrong");
            // timerPunishment();
        }
    }
});

option2.addEventListener("click", function(event){
    if (quizStarted === false){
        alert("Click the answer button to start the quiz! Each incorrect answer costs you 5 seconds. Can you answer 13 questions in 60 seconds?");
    }
    else {
        if (questions [quizPosition][5] === 2) { 
            console.log ("Correct");
            quizPosition ++;
            battleRound();
        }
        else {
            console.log ("Wrong");
            // timerPunishment();
        }
    }
});

option3.addEventListener("click", function(event){
    if (quizStarted === false){
        alert("Look at the current highscores!");
    }
    else {
        if (questions [quizPosition][5] === 3) { 
            console.log ("Correct");
            quizPosition ++;
            battleRound();
        }
        else {
            console.log ("Wrong");
            // timerPunishment();
        }
    }
});

option4.addEventListener("click", function(event){
    if (quizStarted === false){
        alert("You can't run away!");
    }
    else {
        if (questions [quizPosition][5] === 4) { 
            console.log ("Correct");
            quizPosition ++;
            battleRound();
        }
        else {
            console.log ("Wrong");
            // timerPunishment();
        }
    }
});

function fight() 
{
    console.log("general");
    quizPosition = 0;
    quizStarted = true;
    battleRound();
    // Starttimer
};

function battleRound ()
{
    question.textContent = questions [quizPosition][0];
    option1.textContent = questions [quizPosition][1];
    option2.textContent = questions [quizPosition][2];
    option3.textContent = questions [quizPosition][3];
    option4.textContent = questions [quizPosition][4];

};


// question.textContent = questions [0][0];
// option1.textContent = questions [0][1];
// option2.textContent = questions [0][2];
// option3.textContent = questions [0][3];
// option4.textContent = questions [0][4];

// option1.addEventListener("click", function(event) {
//     option1.textContent = questions [0][1];
// });

