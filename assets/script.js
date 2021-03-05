var question = document.querySelector("#question");
var option1 = document.querySelector("#optionOne");
var option2 = document.querySelector("#optionTwo");
var option3 = document.querySelector("#optionThree");
var option4 = document.querySelector("#optionFour");

var quizPosition;
var quizStarted = false;

var questions = [
    ["Inside which HTML element do we put the JavaScript?", "<js>", "<javascript>", "<scripting>", "<script>"],
    ["How do you write 'hello world' in an alert box?", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"]
]

option1.addEventListener("click", function(event){
    if (quizStarted === false){
        fight();
    }
    else {
        console.log("kenobi");
    }
});

option2.addEventListener("click", function(event){
    if (quizStarted === false){
        alert("Click the answer button to start the quiz! Can you answer 13 questions in 60 seconds?");
    }
    else {
        console.log("STARFOX!!!");
    }
});

option3.addEventListener("click", function(event){
    if (quizStarted === false){
        alert("Look at the current highscores!");
    }
    else {
        console.log("WOLFE!!!");
    }
});

option4.addEventListener("click", function(event){
    if (quizStarted === false){
        alert("You can't run away!");
    }
    else {
        console.log("Santa!!!");
    }
});


function fight() 
{
    console.log("general");
    quizPosition = 0
    quizStarted = true;
    question.textContent = questions [0][0];
    option1.textContent = questions [0][1];
    option2.textContent = questions [0][2];
    option3.textContent = questions [0][3];
    option4.textContent = questions [0][4];
    // Starttimer
};

// question.textContent = questions [0][0];
// option1.textContent = questions [0][1];
// option2.textContent = questions [0][2];
// option3.textContent = questions [0][3];
// option4.textContent = questions [0][4];

// option1.addEventListener("click", function(event) {
//     option1.textContent = questions [0][1];
// });

