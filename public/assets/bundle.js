"use strict";

window.onload = () => {
    try {
        //implementing listener
        document.getElementById('age').addEventListener('input', () => {
            document.getElementById('age-display').innerHTML = document.getElementById('age').value;
        });

        document.getElementById('submit-register').addEventListener('click', () => {
            //parsing input from form

            var username = document.getElementById('name').value, age = document.getElementById('age').value, error = document.getElementById('error-message');
            if(!(username.length > 2 && username.length < 64)) {
                error.innerHTML = 'Your name has to be at least 2 characters';
                return;
            };
            if(!(age > 2 && age < 100)) {
                error.innerHTML = 'Your age has to be between 3 and 99';
            };

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "POST", 'api/register', false);
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify({name: username, age: age, date: new Date().now}));

            window.location.replace("solve"); //redirect user
        });   
    } catch (error) {
        
    }
}