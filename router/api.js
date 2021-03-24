"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();

const checkSession =  (req, res, next) => {
    //Middleware to check session
    if(req.cookies.user == null) return res.status(401).json({status: 401, message: "Unauthorised, redirecting client to register page"});
    next();
};

router.post('/register', (req, res) => {
    if(req.body.name === undefined && req.body.age === undefined) res.status(400).json({status: 400, message: "Invalid request, it should contain name and age"});

    var data = {
        name: req.body.name,
        age: req.body.age,
        date: Date.now()
    };

    res.cookie("user", decodeURIComponent(JSON.stringify(data)), {expire: (60000 * 60 * 24 * 1) + Date.now()}); //Cookie expires after 24h

    res.status(200).json({status: 200, message: "Cookie set, ready for redirect"});
});

router.post('/check', (req, res) => {
    if(req.body.answer === undefined) res.status(400).json({status: 400, message: "Invalid request, it should contain an array of answers"});

    console.log(req.body.answer);

    res.status(200).json({status: 200, message: "Cookie set, ready for redirect"});
});

router.get('/problem', checkSession, (req, res) => {
    var problems = require('../problems.json');

    if(problems.problems.length == 0) return res.status(500).json({status: 500, "message": "No math problems were found in config file"});

    var re = {problems: []};
    problems.problems.forEach(element => {
        delete element.answer;
        re.problems.push(element);
    })

    res.status(200).json({status: 200, message: re});
});

router.all('/*', checkSession, (req, res) => {
    res.status(404).json({status: 404, message: "This resource could not be found"});
});

module.exports = router;