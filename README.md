# web-service-cookie-example

This project should explain the importance of cookies online based on a simple website, to solve mathematical problems. A user should enter his nickname and age to solve ten problems, after that, his nickname and age is saved and presentet on a leaderboard.

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