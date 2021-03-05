var question = document.querySelector("#question");
var option1 = document.querySelector("#optionOne");
var option2 = document.querySelector("#optionTwo");
var option3 = document.querySelector("#optionThree");
var option4 = document.querySelector("#optionFour");
var questions = [
    ["Inside which HTML element do we put the JavaScript?", "<js>", "<javascript>", "<scripting>", "<script>"],
    ["How do you write 'hello world' in an alert box?", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"]
]

question.textContent = questions [0][0];
option1.textContent = questions [0][1];
option2.textContent = questions [0][2];
option3.textContent = questions [0][3];
option4.textContent = questions [0][4];

// option1.addEventListener("click", function(event) {
//     option1.textContent = questions [0][1];
// });

