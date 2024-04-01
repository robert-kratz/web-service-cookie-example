# web-service-cookie-example

This project is designed to illustrate the role of online cookies using a straightforward website that allows users to solve mathematical problems. To participate, users must enter their nickname and age before tackling ten problems. Upon completion, the website saves and displays their nickname and age on a leaderboard, showcasing the practical application of cookies for personalized user experiences.


### Getting started

Start by cloning this repository, make sure `nodejs` and `git` is installed on your machine

```
$ git clone https://github.com/robert-kratz/web-service-cookie-example.git
```

Install dependencies from commandline

```
$ npm install
```

Next you should edit the `config.json`, start by defining your service port (default is 8080) and set the cookie secret, make sure you are not sharing this secret

```
{
    "serviceport": 8080,
    "cookiesecret": "YOUR SECRET HERE"
}
```
And you are on your way, go ahead and start the process

```
$ node index.js
```

Now you can access your website by opening `http://localhost:{YOUR PORT}`

### Configurate math problems

Locate the `problems.json` file in the main directory, you can freely add or remove math problems

```
{
    "problems": [
        {
            "task": "10x = 100",
            "answer": "10",
            "task_message": "What is the value of x"
        }
    ]
}
```

You need to restart the application so the changes take effect
