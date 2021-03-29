# javascript_coding_quiz

https://mmorrisonlk.github.io/javascript_coding_quiz/

![Deployed Site](https://github.com/mmorrisonlk/smu_code_quiz/blob/main/assets/codeQuizDeployed.png?raw=true "Deployed to the Web")

Alright, new assignment, this time I need to build a website that can deliver a multiple choice code quiz with a timer and a leaderboard. So I've first organized my assets and index since I don't have anything to start with this time around. My focus is going to be fleshing out a static mock up in html and style it somewhat in css. That should help me identify what I will need to define for variables and help me visualize what I need to add.

So I have my mock up laid out in a way that I can visualize what ids I'll need. My next hurdle that I want to focus on is getting the Javascript to find and replace text properly. My idea is to get each of the texts correctly replacing individually and then try to get them to all replace the text at the same time.

It looks like I have the basics set up and working. My next thought is how I will store the question and answers. My plan is to create an array of an array. By creating this correctly it should allow me to call an index that will select a question and the website should be able to use the question information because the questions, options and correct answers will all be stored at the same index in a given array. We will first work towards a working version of a simple array before adding multiple questions.

I have successfully completed an array of all the questions (borrowed from the W3 schools javascript quiz). I also have the ability to cycle through these options. The next and (hopefully!) last hurdle is to get the timer working correctly.

And what a hurdle that was. I borrowed extensively from some nice code I found but adapting it was a pain. I ended up drawing 3 circles in total. One plain circle, one empty circle that actually is just displaying the current time inside and then a circle with the remaining time visualized and with color changes on 30 seconds and 10 seconds. It proved immediately useful that I actually had gone throught the trouble of learning something about intervals (and how to stop them!). 

The high score storage is weak and I fully recognize that. But it is the first solution I came up with and I had minimal problems iterating through each step of the coding process. I would like it to organize the times in order of fastest to slowest and to dump the information in a more organized manner but it does the job.
