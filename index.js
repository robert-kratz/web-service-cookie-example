"use strict";

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const app = express();

//Set the assets folder to static so it can be access 
app.use('/assets', express.static(__dirname + '/public/assets'));
//Bind morgan to webserver so you can log the requests
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, '/log/access.log'), { flags: 'a' }) }));

//Cookieparser is nessesary for using cookies in express 4<
app.use(cookieParser(require('./config.json').cookiesecret));

//Bodyparser, enables the webserver to read POST requests send from client
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Binding api router
app.use('/api', require('./router/api'));

//Middleware to check session
const checkSession =  (req, res, next) => {
    if(req.cookies.user == null) return res.status(401).json({status: 401, message: "Unauthorised, redirecting client to register page"});
    next();
};

//index.html to default
app.get('/', (req, res) => {
    fs.readFile(__dirname + '/public/index.html', 'utf8', (err, data) => {
        if(err) res.json({status: 500, message: 'An internal error occurred'})
        res.send(data);
    });
});

//math.html to default
app.get('/solve', checkSession, (req, res) => {
    fs.readFile(__dirname + '/public/math.html', 'utf8', (err, data) => {
        if(err) res.json({status: 500, message: 'An internal error occurred'})
        res.send(data);
    });
});

//result.html to default
app.get('/result', checkSession, (req, res) => {
    fs.readFile(__dirname + '/public/result.html', 'utf8', (err, data) => {
        if(err) res.json({status: 500, message: 'An internal error occurred'})
        res.send(data);
    });
});

//404 site not found
app.get('/*', (req, res) => {
    fs.readFile(__dirname + '/public/sitenotfound.html', 'utf8', (err, data) => {
        if(err) res.json({status: 402, message: 'An internal error occurred'})
        res.send(data);
    });
});

app.post('/*', (req, res) => {
    res.json({status: 404, message: 'This resource could not be found'}).status(404);
});

app.listen(require('./config.json').serviceport || 8080, () => {
    console.log(`Webserver started on http://localhost:${require('./config.json').serviceport || 8080}`);
})