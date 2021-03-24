"use strict";

var problems = [], answers = [], amount;

window.onload = () => {

    try {
        //check if user has a cookie
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'api/problem', false);
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHttp.send();

        if(xmlHttp.status != 200) return window.location.replace("./"); //redirecting user to register page

        console.log(JSON.parse(xmlHttp.response).message);

        if(JSON.parse(xmlHttp.response).message.problems == null) return document.getElementById('title').innerHTML = "The responds is invalid";

        problems = JSON.parse(xmlHttp.response).message.problems;
        amount = problems.length;

        loadNextProblem();

        document.getElementById('task-submit').addEventListener('click', () => {
            if(document.getElementById('task-imp').value.length == 0) return document.getElementById('error-message').innerHTML = "You have to give a answer";
            loadNextProblem();
        });

        function loadNextProblem() {
            if(problems.length > 0) {
                var username = decodeURIComponent(getCookie('user'));
                document.getElementById('title').innerHTML = "You are playing as " + JSON.parse(username).name;
                document.getElementById('task-no').innerHTML = "Task " + (answers.length + 1) + " / " + amount;
                document.getElementById('task').innerHTML = problems[0].task;
                document.getElementById('task-q').innerHTML = problems[0].task_message;

                console.log(document.getElementById('task-imp').value + " 1");

                answers.push({task: problems[0].task, answer: document.getElementById('task-imp').value});
                document.getElementById('task-imp').value = null;
                document.getElementById('task-imp').focus();

                document.getElementById('error-message').innerHTML = "";

                problems.shift();
            } else {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST", 'api/check', false);
                xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlHttp.send(JSON.stringify({answer: answers}));
            }
        }
    } catch (error) {
        console.warn(error);
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}