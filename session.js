
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
let calorie = require('./calorie.js');
const calorieData = calorie.calorieData

module.exports = function (app) {
    const users = {
        "testuser": "testpass"
    };
    const sessions = {};

    const isValidUsername = function (username) {

        if (!username) {
            return false;
        }

        const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
        if (username !== cleanUsername) {
            return false;
        }
        return true;
    };

    const create = function ({ username, password }) {
        if (!username) {
            return { error: 'Username-Required' };
        }

        if (!isValidUsername(username)) {
            return { error: 'Invalid-Credentials' };
        }

        if (!password) {
            return { error: 'Password-Required' };
        }

        if ((username.length <= 5) || (password.length <= 5)) {
            return { error: 'Username and Password length should be at least 5' };
        }

        console.log(users);
        if (users[username] && (users[username] != password)) {
            return { error: 'Invalid-Credentials' };
        }
        const sid = uuid();
        calorieData[username] = calorieData[username] || {

        };

        sessions[sid] = {
            sid,
            username,
            startTime: Date.now(),
            info: calorieData[username]
        };
        users[username] = password;
        return { sid };
    };

    const remove = function (sid) {
        delete sessions[sid];
    };

    const isValid = function (sid) {
        return !!sessions[sid];
    };


    app.get('/api/session', (req, res) => {
        const sid = req.cookies.sid;
        if (!sid) {
            res.status(401).json({ error: 'session-required' });
            return;
        }
        if (!isValid(sid)) {
            res.status(403).json({ error: 'session-invalid' });
            return;
        }
        const username = sessions[sid].username
        sessions[sid]["info"] = calorieData[username]
        res.json(sessions[sid]);
    });

    app.post('/api/session', (req, res) => {
        console.log(req.body.username);
        console.log(req.body.password);
        const username = req.body.username;
        const password = req.body.password;
        const { sid, error } = create({ username, password });
        if (error) {
            res.status(400).json(error);
            return;
        }
        res.cookie('sid', sid);
        res.json(sessions[sid]);
    });

    app.delete('/api/session', (req, res) => {
        const sid = req.cookies.sid;
        remove(sid);
        res.clearCookie('sid');
        res.json({ sid, status: 'removed' });
    });

    app.get('/api/secrets', (req, res) => {
        const sid = req.cookies.sid;
        if (!sid) {
            res.status(401).json({ error: 'session-required' });
            return;
        }
        if (!isValid(sid)) {
            res.clearCookie('sid');
            res.status(403).json({ error: 'session-invalid' });
            return;
        }
        res.json({ stuff: 'this is secret' });
    });

};


