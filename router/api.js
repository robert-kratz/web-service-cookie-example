"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();

const checkSession =  (req, res, next) => {
    next();
};

router.post('/register', (req, res) => {
    if(req.body.name === undefined && req.body.age === undefined) res.status(400).json({"status": 400, "message": "Invalid request, it should contain name and age"});

    var data = {
        name: req.body.name,
        age: req.body.age,
        date: Date.now()
    };
    console.log('New user registered: ' + JSON.stringify(data));

    res.cookie("user", data, {expire: (60000 * 60 * 24 * 1) + Date.now()}); //Cookie expires after 24h

    res.status(200).json({"status": 200, "message": "Cookie set, ready for redirect"});
});

router.all('/*', checkSession, (req, res) => {
    res.status(200).json({"status": 404, "message": "This resource could not be found"});
});

module.exports = router;